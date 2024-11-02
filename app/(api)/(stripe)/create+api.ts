import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;
  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: "Please enter an invalid email", status: 400 }),
    );
  }
  let customer;
  const existingCustomerExist = await stripe.customers.list({ email });
  if (existingCustomerExist.data.length > 0) {
    customer = existingCustomerExist.data[0];
  } else {
    const newCustomer = await stripe.customers.create({ name, email });
    customer = newCustomer;
  }
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-10-28.acacia" },
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "CAD",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
      allow_redirect: "never",
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );
}
