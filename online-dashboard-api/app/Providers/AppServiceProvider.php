<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\Contracts\AuthServiceInterface;
use App\Services\Contracts\JobServiceInterface;
use App\Services\Contracts\PaymentGatewayInterface;
use App\Services\Contracts\PaymentServiceInterface;
use App\Services\Contracts\TokenServiceInterface;
use App\Services\Gateways\RazorpayGateway;
use App\Services\JobService;
use App\Services\PaymentService;
use App\Services\TokenService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TokenServiceInterface::class, TokenService::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(JobServiceInterface::class, JobService::class);
        $this->app->bind(PaymentServiceInterface::class, PaymentService::class);
        $this->app->bind(PaymentGatewayInterface::class, RazorpayGateway::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Passport::enablePasswordGrant();

        Passport::tokensExpireIn(now()->addMinutes(1440));
        Passport::refreshTokensExpireIn(now()->addMinutes(1440));
        // $this->getGoogleDriveStorage();
        Schema::defaultStringLength(191);
    }

    public function getGoogleDriveStorage()
    {
        try {
            Storage::extend('google', function ($app, $config) {
                $options = [];

                if (! empty($config['teamDriveId'] ?? null)) {
                    $options['teamDriveId'] = $config['teamDriveId'];
                }

                if (! empty($config['sharedFolderId'] ?? null)) {
                    $options['sharedFolderId'] = $config['sharedFolderId'];
                }

                $client = new \Google\Client;
                $client->setClientId($config['clientId']);
                $client->setClientSecret($config['clientSecret']);
                $client->refreshToken($config['refreshToken']);

                $service = new \Google\Service\Drive($client);
                $adapter = new \Masbug\Flysystem\GoogleDriveAdapter($service, $config['folder'] ?? '/', $options);
                $driver = new \League\Flysystem\Filesystem($adapter);

                return new \Illuminate\Filesystem\FilesystemAdapter($driver, $adapter);
            });
        } catch (\Exception $e) {
            // your exception handling logic
        }
    }
}
