import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json(); // Receive cart items
    console.log("Received cart items:", cartItems); // Log received cart items

    // Create line items dynamically from cart data
    const lineItems = cartItems.map((item: { title: string; price: number }) => ({
      price_data: {
        currency: "usd", // Currency of the product
        product_data: {
          name: item.title, // Product name
        },
        unit_amount: item.price * 100, // Price in cents
      },
      quantity: 1, // Quantity of each product
    }));

    console.log("Line items for Stripe:", lineItems); // Log line items

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems, // Pass the dynamically created line items
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cart",
    });

    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error: unknown) {
    // Type assertion to Error type
    if (error instanceof Error) {
      console.error("Error creating checkout session:", error); // Log error
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fallback error handling if not an instance of Error
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
