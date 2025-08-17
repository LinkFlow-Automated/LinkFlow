import Footer from "@/components/shared/Footer";
import Image from "next/image";


const creators = [
  {
    name: 'Karein Wilson',
    role: 'Tiktok Influencer',
    platform: 'TikTok',
    followers: '2.4M',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Photograher',
    platform: 'Instagram',
    followers: '890K',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Tim Hawkins',
    role: 'Career Coach',
    platform: 'YouTube',
    followers: '1.2M',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Bessie Cooper',
    role: 'Chess Streamer',
    platform: 'TikTok',
    followers: '3.1M',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emma Thompson',
    role: 'Beauty Creator',
    platform: 'Instagram',
    followers: '1.8M',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Yusuf Babalola',
    role: 'Tech Content Creator',
    platform: 'YouTube',
    followers: '2.7M',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
]

export default function CreatorPage() {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              What type of creator are you?
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Discover how different creators use Breezi to grow their audience, get to monetize their content online, and build their personal brand on Breezi.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {creators.map((creator) => (
              <li key={creator.name}>
                <div className="flex items-center gap-x-6">
                  <Image
                    alt={creator.name}
                    src={creator.imageUrl}
                    width={64}
                    height={64}
                    className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{creator.name}</h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">{creator.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{creator.platform} • {creator.followers} followers</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </>
  )
}
