<?php
/* Template. Copy to pay-config.php on the server (WebFTP) and fill in. Never commit the real file.
   payment_link:   the Stripe Payment Link for monitoring, e.g. https://buy.stripe.com/xxxx
   webhook_secret: the signing secret of the Stripe webhook, starts with whsec_
   portal_link:    the Stripe customer portal login link, e.g. https://billing.stripe.com/p/login/xxxx */
return [
    'payment_link'   => '',
    'webhook_secret' => '',
    'portal_link'    => '',
];
