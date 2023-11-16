import Strip from "stripe";

export const stripe = new Strip(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true
});