import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  //console.log("Received request in /stripe/create");

  const body = await request.json();
  //console.log("Request body:", body);

  const { name, email, amount } = body;
  if (!name || !email || !amount) {
    console.log("Missing required fields in request body");
    return new Response(
      JSON.stringify({
        error: "Please enter a valid name, email, and amount",
        status: 400,
      }),
    );
  }

  let customer;
  //console.log("Checking for existing customer with email:", email);

  const existingCustomerExist = await stripe.customers.list({ email });
  //console.log("Existing customer data:", existingCustomerExist.data);

  if (existingCustomerExist.data.length > 0) {
    customer = existingCustomerExist.data[0];
    //console.log("Found existing customer:", customer);
  } else {
    //console.log("Creating new customer");
    const newCustomer = await stripe.customers.create({ name, email });
    customer = newCustomer;
    //console.log("New customer created:", customer);
  }

  //console.log("Creating ephemeral key for customer:", customer.id);
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-10-28.acacia" },
  );
  //console.log("Ephemeral key created:", ephemeralKey);

  //console.log("Creating payment intent with amount:", amount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "CAD",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });
  //console.log("Payment intent created:", paymentIntent);

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );
}
