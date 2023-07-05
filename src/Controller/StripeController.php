<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class StripeController extends AbstractController
{
    /**
     * @Route("/api/create-checkout-session", name="app_stripe")
     */
    public function createSession(Request $request): JsonResponse
    {
        $stripe = new \Stripe\StripeClient('sk_test_51NQbeaHlEtr8FNYnqPBDK4tErgH5jWfTespND74rlaKirAkkH9uxf2lO6u6V1wWNwHbVZ0ov0Z5q7VXFHXYHBRYs0002R0yns0');
        
        $payload = json_decode($request->getContent(), true);

        
        $products = $payload["items"];
        
        $lineItems = [];
        // dd($lineItems);
        
        foreach ($products as $product) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => $product['price'] * 100,
                    'product_data' => [
                        'name' => $product['title'],
                    ],
                ],
                'quantity' => $product['quantity'],
            ];
        }

        // dd($lineItems);


        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'success_url' => 'http://localhost:8000/success',
            'cancel_url' => 'http://localhost:8000/',
          ]);

        // dd($checkout_session);

        return new JsonResponse(['sessionId' => $checkout_session->id]);
    }
}
