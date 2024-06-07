import Icon from "./Icon";

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-[1100] flex justify-center items-center bg-white/80">
      <Icon name="Settings" className="animate-spin w-8 h-8 fill-primary-400" />
    </div>
  );
}

export default LoadingOverlay;
