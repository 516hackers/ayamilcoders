<?php

return [
    // Explicit, informed opt-in: a public cash-per-share indicator exposes a
    // derived signal from private ledger cash balances.
    'public_enabled' => (bool) env('AYAMIL_PUBLIC_LEDGER_INDICATOR_ENABLED', false),
    'feed_url' => env('AYAMIL_LEDGER_FEED_URL', ''),
    'feed_token' => env('AYAMIL_LEDGER_FEED_TOKEN', ''),
];
