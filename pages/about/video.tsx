import { useRouter } from "next/router"
import { useEffect } from "react"
import LoadingIcon from "../../components/common/LoadingIcon"

const VideoPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("https://youtu.be/0OOlOMXxVLU")
    }, [router])

    return (
        <div className="text-white text-center">
            <h1 className='text-3xl mt-32 font-bold'>Redirecting to YouTube</h1>
            <LoadingIcon loading={true} />
        </div>
    )
}

export default VideoPage