"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../utils/useAuth"
import ImgInput from "../../components/imgInput"  

const CreateItem = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  
  const router = useRouter()

  const loginUserEmail = useAuth()  
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Conent-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    } catch {
      alert("아이템 작성 실패")
    }
  }
  if (loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">아이템 작성</h1>
        <ImgInput setImage={setImage}/>  
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="아이템명" required />
          <input value={price} onChange={(e) => setPrice(e.target.value)}type="text" name="price" placeholder="가격" required />
          <input value={image} onChange={(e) => setImage(e.target.value)}type="text" name="image" placeholder="이미지" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}name="description" rows={15} placeholder="상품 설명" required></textarea>
          <button>작성</button>
        </form>
      </div>
    )
  }
}

export default CreateItem

// img1: http://res.cloudinary.com/daeprmo1b/image/upload/v1736161968/sxl8euuq0wmpuycoltaq.jpg
// img2: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162008/tpy1osuzkphafxhrnjqj.jpg
// img3: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162026/kafmdl0kn4es4pif3plo.jpg
// img4: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162044/sn0fhwmm051w6hddgo9o.jpg
// img5: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162063/vthqq1ayj5oubc5kanyv.jpg
// img6: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162117/a4gch2w637rky6ecxiom.jpg
// img7: http://res.cloudinary.com/daeprmo1b/image/upload/v1736162137/cdbzhnmn2qerr10c6p4l.jpg