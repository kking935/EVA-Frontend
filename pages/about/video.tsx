import { useRouter } from "next/router"
import { useEffect } from "react"
import LoadingIcon from "../../components/common/LoadingIcon"

const VideoPage = () => {
    const router = useRouter()

    useEffect(() => {
        const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL;
        if (VIDEO_URL) {
            router.push(VIDEO_URL)
        }
        else {
            router.push('/404')
        }
    }, [router])

    return (
        <div className="text-white text-center">
            <h1 className='text-3xl mt-32 font-bold'>Redirecting to YouTube</h1>
            <LoadingIcon loading={true} />
        </div>
    )
}

export default VideoPage