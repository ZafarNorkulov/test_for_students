import useGetData from '../../../hooks/useGetData'
import { Avatar, Button, Card, message } from 'antd'
import { IResultQuiz, IUser } from '../../../types/data.models'
import confetti from "canvas-confetti"
import Loader from '../../../components/loader'

const QuestionResult = () => {
    const { data: result, error } = useGetData<IResultQuiz>({
        queryKey: ["quiz-result"],
        url: `api/v1/quiz/answer/${1}`,

        options: {
            staleTime: Infinity,
            retry: 0,

        }
    })
    const { data: user } = useGetData<IUser>({
        queryKey: ["user"],
        url: "api/v1/user/profile",
        options: { refetchOnWindowFocus: false }
    })


    if (result) {
        confetti({
            particleCount: 250,
            spread: 200,
            gravity: 2

        });

        message.success("Tabriklaymiz!")
    }
    if (error) {
        message.error("Sizning so'rovingiz bo'yicha ma'lumot topilmadi")
        return <Loader />
    }
    return (
        <div className='w-full h-[70vh] flex items-center justify-center'>
            {result ? <Card bordered style={{ width: 400, columnGap: 10 }}>
                <div className="flex flex-col gap-y-4">
                    <div className='flex items-center justify-center flex-col gap-y-3'>

                        <Avatar size={100} icon={`${user?.full_name.slice(0, 1).toUpperCase()}`} />
                        <h3 className='text-xl font-bold'>{user?.full_name}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-5">

                        <h4 className='text-lg'>{result?.science?.name}</h4> <span className='text-lg'>{result?.question_result}/30</span>
                    </div>
                    <span className='text-5xl mx-auto text-green-600'>{Number(result?.question_result) > 25 ? 5 : Number(result?.question_result) > 21 ? 4 : Number(result?.question_result) > 16 ? 3 : 2}</span>
                    <Button type="primary" size='large' className='mt-5 w-max mx-auto'>Bosh sahifaga o'tish</Button>
                </div>
            </Card> : ""}
        </div>
    )
}

export default QuestionResult