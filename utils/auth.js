import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
  return async(req, res) => {
    if(req.method === "GET"){
      return handler(req, res)
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90YWluLmNvbSIsImlhdCI6MTY4MjczMjk1OSwiZXhwIjoxNjgyODE1NzU5fQ.iXWDSt0Yj7FpsASgB02VSxpzI-ATxWYBzE6zsGhmwYE"
    // const token = await req.headers.authorization.split("")[1]
    if(!token){
      return res.status(401).json({message: "トークンがありません"})
    }

    try{
      const decoded = jwt.verify(token, secret_key)
      req.body.email = decoded.email
      return handler(req, res)
    }catch(err){
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
    }
  }
}

export default auth
