interface IAvatar {
  bg: string;
  text: string;
  size?: string;
}

const Avatar = ({ bg, text, size }: IAvatar) => {
  return (
    <div
      className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-[16px] text-[#FFF]"
      style={{
        background: bg,
        height: size,
        width: size,
      }}
    >
      {text}
    </div>
  );
};

export default Avatar;
