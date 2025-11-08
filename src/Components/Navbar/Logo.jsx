const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Icon */}
      <img src="/logo.png" alt="" className="h-7 w-7"/>

      {/* Text */}
      <h1 className="text-3xl font-bold text-green-900 tracking-tight">
        Freelify
      </h1>
    </div>
  );
};

export default Logo;
