import jwt from "jsonwebtoken";

export default function getToken(req) {
    let name = "";
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return null // Forbidden if token is invalid
        }
        console.log(decoded.name);
        name = decoded.name;
    });
    return name;
}   