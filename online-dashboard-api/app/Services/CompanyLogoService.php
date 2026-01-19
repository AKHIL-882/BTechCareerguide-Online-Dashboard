<?php

namespace App\Services;

use App\Models\CompanyLogo;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CompanyLogoService
{
    public function getLogoUrlForCompany(?string $companyName): ?string
    {
        $normalized = $this->normalizeCompanyName($companyName);
        if ($normalized === '') {
            return null;
        }

        $cached = CompanyLogo::where('company_name', $normalized)->first();
        if ($cached) {
            return $cached->logo_url;
        }

        $logoUrl = $this->fetchLogoUrl($normalized);
        if (! $logoUrl) {
            return null;
        }

        CompanyLogo::updateOrCreate(
            ['company_name' => $normalized],
            ['logo_url' => $logoUrl]
        );

        return $logoUrl;
    }

    private function fetchLogoUrl(string $companyName): ?string
    {
        $logo = $this->fetchLogoFromGoogle($companyName);
        if ($logo) {
            return $logo;
        }

        return $this->fetchLogoFromClearbit($companyName);
    }

    private function fetchLogoFromGoogle(string $companyName): ?string
    {
        try {
            $response = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; JobPostBot/1.0)',
                ])
                ->get('https://www.google.com/search', [
                    'tbm' => 'isch',
                    'q' => $companyName.' logo',
                ]);

            if (! $response->ok()) {
                return null;
            }

            $body = $response->body();

            $matches = [];
            preg_match_all('/"ou":"([^"]+)"/', $body, $matches);
            $urls = $matches[1] ?? [];
            foreach ($urls as $url) {
                $clean = stripslashes($url);
                if (Str::startsWith($clean, ['http://', 'https://'])) {
                    return $clean;
                }
            }

            $fallbackMatches = [];
            preg_match_all('/https?:\\/\\/[^"\'<>]+/', $body, $fallbackMatches);
            $fallbackUrls = $fallbackMatches[0] ?? [];
            foreach ($fallbackUrls as $url) {
                $clean = stripslashes($url);
                if (Str::startsWith($clean, ['http://', 'https://'])
                    && Str::contains($clean, 'gstatic.com/images')) {
                    return $clean;
                }
            }
        } catch (\Throwable $e) {
            return null;
        }

        return null;
    }

    private function fetchLogoFromClearbit(string $companyName): ?string
    {
        try {
            $response = Http::timeout(6)->get(
                'https://autocomplete.clearbit.com/v1/companies/suggest',
                ['query' => $companyName]
            );

            if (! $response->ok()) {
                return null;
            }

            $matches = $response->json();
            if (! is_array($matches) || empty($matches)) {
                return null;
            }

            $first = $matches[0] ?? [];
            $logoUrl = $first['logo'] ?? null;
            $domain = $first['domain'] ?? null;

            if ($logoUrl) {
                return $logoUrl;
            }

            if ($domain) {
                return "https://logo.clearbit.com/{$domain}";
            }
        } catch (\Throwable $e) {
            return null;
        }

        return null;
    }

    private function normalizeCompanyName(?string $companyName): string
    {
        return Str::lower(Str::squish($companyName ?? ''));
    }
}
