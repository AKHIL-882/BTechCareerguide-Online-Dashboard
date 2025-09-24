<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string|null $button
 * @property string|null $link
 * @property string|null $image
 * @property string|null $youtube_video_link
 * @property string|null $company_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereButton($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereYoutubeVideoLink($value)
 * @mixin \Eloquent
 */
class Slide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'button',
        'link',
        'image',
        'youtube_video_link',
        'company_name',
    ];
}
