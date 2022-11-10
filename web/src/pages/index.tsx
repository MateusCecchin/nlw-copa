import Image from 'next/image'
import appPreviewImage from '../assets/aplicacao-trilha-ignite.png'
import logo from "../assets/logo.svg"
import iconCheckImg from "../assets/icon-check.svg"
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  usersCount: number;
}
export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

async function createPool(event: FormEvent){
    event.preventDefault

    try {
       const res = await api.post('/pools', {
        title: poolTitle
      })

      const {code} = res.data

      navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')

      setPoolTitle('')

    } catch (error) {
        alert('Falha ao criar o bolão, tente novamente!')
    }
  }
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logo} alt="a"/>
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
        <div className="my-10">
            <strong className="text-gray-100 text-xl">
                <span className='text-green-500'>+ {props.usersCount}</span> pessoas já estão usando
            </strong>
        </div>

        <form onSubmit={createPool} className='flex gap-2'>
          <input 
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text" 
            required 
            placeholder='Qual nome do seu bolão?'
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button 
            className="bg-yellow-500  px-6 py-4 rounded text-gray-900 font-bold hover:bg-yellow-600" 
            type="submit" 
          >
            CRIAR MEU BOLÂO
          </button>
        </form>

        <p className=' mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        
        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" quality={100}/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>
               + {props.poolCount}
              </span>
              <span>Bolão criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'></div>

          <div className='flex items-center  gap-6'>
          <Image src={iconCheckImg} alt="" quality={100}/>
            <div className='flex flex-col '>
            <span className='font-bold text-2xl'>
                + {props.guessesCount}
              </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

          <Image src={appPreviewImage} alt="a" quality={100}/>
    </div>
    )
  }
  
  export const getServerSideProps = async () => {

    const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count')
    ])

    return {
      props: {
        poolCount: poolCountResponse.data.count,
        guessesCount: guessesCountResponse.data.count,
        usersCount: usersCountResponse.data.count
      }
    }
  } 