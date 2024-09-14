// https://i.ibb.co/HBxYv2H/emoticon-happy.webp
// https://i.ibb.co/Y8KMFDn/Mask-group-3.webp
// https://i.ibb.co/LrW9b6S/Mask-group-6.webp
// https://i.ibb.co/Pt39cv1/Mask-group-7.webp

const Info = () => {
    return (
    <div className="flex gap-5 md:gap-10 my-20 justify-center flex-wrap">
 
    <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/Y8KMFDn/Mask-group-3.webp" alt="total properties" />
        <img src="https://i.ibb.co/Y8KMFDn/Mask-group-3.webp" alt="total properties" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">60</h3>
        <p className="text-[#fff] text-[13px]">total properties</p>
    </div>   

    <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/LrW9b6S/Mask-group-6.webp" alt="sold properties" />
        <img src="https://i.ibb.co/LrW9b6S/Mask-group-6.webp" alt="sold properties" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">60</h3>
        <p className="text-[#fff] text-[13px]">sold properties</p>
    </div>   

    <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/Pt39cv1/Mask-group-7.webp" alt="properties for sale" />
        <img src="https://i.ibb.co/Pt39cv1/Mask-group-7.webp" alt="properties for sale" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">60</h3>
        <p className="text-[#fff] text-[13px]">properties for sale</p>
    </div>   

    <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/HBxYv2H/emoticon-happy.webp" alt="happy customers" />
        <img src="https://i.ibb.co/HBxYv2H/emoticon-happy.webp" alt="happy customers" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10"/>

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">60</h3>
        <p className="text-[#fff] text-[13px]">happy customers</p>
    </div>       
    
    </div>
    );
};

export default Info;
