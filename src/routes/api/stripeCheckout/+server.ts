import type { RequestHandler } from './$types';
import Stripe from 'stripe';

// localhost:5173/api/stripeCheckout

const SECRET_STRIPE_KEY = "";
const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2022-11-15"
});

export const POST: RequestHandler = async ({ request }) => { // Respuesta de stripe
    const data = await request.json();                       // Respuesta convertida a json   
    const items = data.items;                                // Obtenemos los items
    console.log(items);

    /*
       we have: [ { id: "1", quantity: 6 }, { id: "2", quantity: 3 } ]
       stripe wants: [ { price: "1", quantity: 6 }, { price: "2", quantity: 3 } ]
   */

    let lineItems: any = [];                                         //Convertimos los items al formato de stripe
    items.forEach((item: any) => {
        lineItems.push({ price: item.id, quantity: item.quantity })
    });

    // It gives us a URL for the person to check out with
    const session = await stripe.checkout.sessions.create({          // Contruimos la session que contiene la data 
        line_items: lineItems,                                       // y la url para mostrar el rdo de la compra.
        mode: 'payment',
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });

    return new Response(
        JSON.stringify({ url: session.url }),                         // frontend will get this url to redirect
        {
            status: 200,
            headers: { 'content-type': 'application/json' }
        }
    )
}
