export default function handler(req, res) {
    console.log(process.env.NCP_ACCESS_TOKEN);
    console.log(req);
    if (req.method === 'POST') {
        console.log(process.env.NCP_ACCESS_TOKEN);
        // Process a POST request
    } else {
        // Handle any other HTTP method
    }

    return null;
}
