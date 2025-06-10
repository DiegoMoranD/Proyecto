<?php
// filepath: app/Console/Commands/DeleteExpiredTokens.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeleteExpiredTokens extends Command
{
    // protected $signature = 'tokens:prune-expired';
    // protected $description = 'Elimina los tokens expirados de personal_access_tokens';

    // public function handle()
    // {
    //     $deleted = DB::table('personal_access_tokens')
    //         ->whereNotNull('expires_at')
    //         ->where('expires_at', '<', now())
    //         ->delete();

    //     $this->info("Tokens eliminados: $deleted");
    // }
}