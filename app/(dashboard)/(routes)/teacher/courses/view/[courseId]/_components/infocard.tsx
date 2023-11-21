import Image from "next/image";

interface MyInfoCardProps {
  cardName: string;
  title?: string;
  format?: boolean;
  image?: string;
}

const MyInfoCard = ({
  cardName,
  title,
  format,
  image
}: MyInfoCardProps) => {
  const formatTitle = () => {
    if (!format) return;
    return "font-bold text-xl"
  }

  const formatImage = () => {
    if (!image) return;
    return (
      <div className="relative aspect-video mt-2">
        <Image
          src={image}
          fill
          alt="course image"
          className="object-cover rounded-md"
        />
      </div>
    )
  }
  return (
    <div>
      <div className='mt-6 bg-white/50 rounded-md p-4'>
        <p className='text-xs uppercase font-light'>{cardName}</p>
        <h2 className={formatTitle()}>
          {title}
          {formatImage()}
        </h2>
      </div>
    </div>
  )
}

export default MyInfoCard