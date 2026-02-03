import myImage from "../../assets/HerpImage.png";

type View = "catalog" | "about" | "artists";

interface ContainSec {
  onNavigate: (view: View) => void;
}

export default function ContainerSection({ onNavigate }: ContainSec) {
  return (
    <section className="@container">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-center bg-white dark:bg-[#3d2b1f] rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-[#f0ebe8] dark:border-[#524034]">
        <div className="flex flex-col gap-6 flex-1 text-center md:text-left items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-xs font-bold text-navy uppercase tracking-wider">
            <span className="size-2 rounded-full bg-primary"></span>
            New Collection
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
            Handmade With{" "}
            <span className="relative inline-block text-primary">
              Love
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary opacity-50"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                ></path>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-navy/70 dark:text-gray-300 font-medium max-w-md">
            Discover Handcrafted doodles,Curated crafts,Signature stickers from
            Doodle Alley.
          </p>
          <div className="flex gap-4 mt-2">
            <button
              className="h-12 px-8 rounded-full bg-primary text-navy font-bold hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2"
              onClick={() => {
                const productsSection =
                  document.getElementById("products-grid");
                productsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Shop
              <span className="material-symbols-outlined text-sm font-bold">
                arrow_forward
              </span>
            </button>
            <button
              className="h-12 px-8 rounded-full bg-white dark:bg-white/5 border border-[#e6e1df] dark:border-white/10 text-navy dark:text-white font-bold hover:bg-background-light dark:hover:bg-white/10 transition-colors"
              onClick={() => onNavigate("artists")}
            >
              Artists
            </button>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-3xl -z-10"></div>
          <div className="aspect-square md:aspect-[4/3] w-full rounded-[2rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white dark:border-[#4a3629]">
            <div
              className="w-full h-full bg-cover bg-center"
              data-alt="Colorful abstract art supplies on a table"
            >
              <img
                src={myImage}
                alt="Doodle Alley"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 md:bottom-4 md:-left-8 bg-white dark:bg-[#2C3E50] p-4 rounded-xl shadow-lg rotate-[-6deg] flex gap-3 items-center border border-gray-100 dark:border-gray-700">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                alt="User avatar"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZQdI_Q39kFeK4s80VPg0RFn-rN6lwsfXeR_2nGpXKC9zRiKBqS8KtoWSq_2BhAxvQPZMzTI0mt_9J0vYmPCxenhJQ3ZkW_roIX_3onvsSP6w5SJlnsamTdKOUtP2FQEMfzKI8ULTCe5iFkLjIST7pLwI_LIisF7iT4Lm9eltugaITXmk4IJAZJCkiG4cQujHVV5Ebq4HqaDNXi8XM3AkQ0F59v31WU10XJ4P_fX9CTRSuWkX2M3kb9jgtSVba4ImRhL3rNAoEvK8"
              />
              <img
                alt="User avatar"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCutu2QfDhzn613f6_uRZCGEMg7ce3W7vGVieOgK7pDm6rH3jhK6rRD-3W50yreTpVIJvh8nr9O_qqDiOnDmJLPHnGum5Aagp9K6ufDO2E7GhHYeDM87S62iNsqZRczn4hr6Lnxr5zAVVo50gmbsdqHsFxV9ZNgg0tAm3NBpvIeS7gZLcoxu2c2TgEiytbofagS8i2AFbmJVYWb9UjFXEsMyuqwo6_q96hkMy00m4u-78bQyIQTwVvMGtaeQzG-YFAPtcgtAAX_vdk"
              />
              <img
                alt="User avatar"
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSnPP6vO7fTknN8rQGnOCTh-YegJlLC8DH9ZmT3QlM0bIUd_gBEVoZu0retXj-elv5hL9VCLaq41cVWbee_j4X6AM-820ffihuXUrkvvkF7tTuRMxvfrDOedgwEnnvLyPEYcoOHRnoBB0IwiqR0oOLxvn5OoIz6BJCnnHZI2ySLfJtmdXaM8EyyBh0O3uhzYHxYuzjomT0T-WqG02WQwfZoCF-E8GyRfUvZCSsyo-VTYoaN4XWtFp4pgZdBR6YXRbYiy-_IGXqP5U"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-navy dark:text-white">
                10k+ Orders
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
