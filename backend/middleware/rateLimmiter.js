import ratelimit from "../src/config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")

        if(!success) {
            return res.status(429).json({
                message:"too many requests"
            })
        }
        next()
    } catch (error) {
        console.error("rate limit error",error)
    }
}
export default rateLimiter