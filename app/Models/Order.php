<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'total_price',
        'status',
        'user_id',
        'transactionuuid'
    ];
    
    public function scopeRecent($query){
        return $query->where('created_at','>=',now()->subDays(30));
    }
    // Define relationships if necessary
    public function orderitems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}