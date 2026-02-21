import DataImage from "./data";
import { listProyek, listPhotos } from "./data";
import emailjs from "@emailjs/browser";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import TiltCard from "./components/TitlCard";

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading true
    setIsSending(true);

    emailjs
      .sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, e.target, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        toast.success("Pesan berhasil dikirim!", {
          duration: 4000,
          style: {
            background: "#10b981",
            color: "#fff",
            padding: "16px",
          },
        });
        e.target.reset(); // Reset form
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast.error("❌ Gagal mengirim pesan. Silakan coba lagi.", {
          duration: 4000,
          style: {
            background: "#ef4444",
            color: "#fff",
            padding: "16px",
          },
        });
      })
      .finally(() => {
        setIsSending(false); // Loading selesai
      });
  };

  const [text] = useTypewriter({
    words: ["Hai everyone", "Selamat Datang", "Di Website Portofolio Saya", "Semoga Kalian Suka yaa!!!"],
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 100,
    deleteSpeed: 50,
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/cv/cv-mokhamad-rafi.pdf", { method: "HEAD" });
      if (!response.ok) {
        throw new Error("File tidak ditemukan");
      }
      const link = document.createElement("a");
      link.href = "/cv/cv-mokhamad-rafi.pdf";
      link.download = "CV-Mokhamad-Rafi.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CV berhasil diunduh!", {
        icon: "📄",
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Maaf, terjadi kesalahan saat mengunduh CV. Silahkan coba lagi nanti.", {
        icon: "❌",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      console.error(" download error:", error);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 500);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="hero grid md:grid-cols-2 pt-10 items-center xl:gap-0 gap-6 grid-cols-1">
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
          <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl">
            <img src={DataImage.HeroImage} alt="Hero Image" className="w-10 rounded-md" loading="lazy" />
            <q className="text-lg">
              {text}
              <Cursor cursorStyle="|" cursorColor="#8b5cf6" />
            </q>
          </div>
          <h1 className="text-5xl/tight font-bold mb-6"> Hi, Saya Mokhamad Rafi</h1>
          <p className="text-base/loose mb-6 opacity-50">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus laboriosam enim quos quibusdam velit! Ipsa quam numquam ad aliquid sint consectetur quae reprehenderit, molestias explicabo pariatur consequatur provident
            cum at!
          </p>
          <div className="flex items-center sm:gap-4 gap-2">
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="bg-violet-700 p-4 rounded-2xl hover:bg-violet-600 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-w-40 justify-center cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <i className="ri-loader-4-line ri-lg animate-spin"></i>
                  <span>Menyiapkan...</span>
                </>
              ) : (
                <>
                  Download CV <i className="ri-download-line ri-lg"></i>
                </>
              )}
            </button>
            <a href="#proyek" className="bg-zinc-700 p-4 rounded-2xl hover:bg-zinc-600">
              Lihat Proyek <i className="ri-arrow-down-line ri-lg"></i>
            </a>
          </div>
        </div>
        <img src={DataImage.HeroImage} alt="Hero Image" className="w-125 md:ml-auto animate__animated animate__fadeInUp animate__delay-3s" loading="lazy" />
      </div>
      {/* tentang */}
      <div className="tentang mt-32 py-10" id="tentang">
        <div className="xl:w-2/3 lg:w-3/4 w-full mx-auto p-7 bg-zinc-800 rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          <img src={DataImage.HeroImage} alt="image" className="w-12 rounded-md mb-10 sm:hidden" loading="lazy" />
          <p className="text-base/loose mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis assumenda a voluptatem quasi, sunt fuga, unde odit dolorem ab ullam laborum aliquam harum sapiente quidem officiis magnam maxime animi. Totam ad placeat,
            molestiae facere pariatur itaque magni? Temporibus quibusdam officiis, error dicta cum soluta facere reiciendis distinctio consectetur esse quia.
          </p>
          <div className="flex items-center justify-between">
            <img src={DataImage.HeroImage} alt="image" className="w-12 rounded-md sm:block hidden" />
            <div className="flex items-center gap-10">
              <div>
                <h1 className="text-4xl mb-1">
                  1500 <span className="text-violet-500">+</span>
                </h1>
                <p>proyek selesai</p>
              </div>
              <div>
                <h1 className="text-4xl mb-1">
                  400 <span className="text-violet-500">+</span>
                </h1>
                <p>Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>
        {/* my photos section */}
        <div className="photos mt-32 ">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            My Photos <i className="ri-image-line"></i>
          </h1>
          <p className="xl:w-2/5 lg:w-2/4 md:w-2/3 sm:w-3/4 w-full text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            Beberapa momen yang saya abadikan dalam foto
          </p>

          <div className="photos-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={photo.dad}
                data-aos-once="true"
                onClick={() => {
                  setPhotoIndex(index);
                  setOpen(true);
                }}
              >
                <img src={photo.gambar} alt={photo.judul} className="w-full h-64 object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <i className="ri-search-eye-line ri-2x text-white"></i>
                </div>
              </div>
            ))}
          </div>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={photoIndex}
            slides={listPhotos.map((photo) => ({
              src: photo.gambar,
              alt: photo.judul,
              title: photo.judul,
              description: photo.deskripsi,
            }))}
            plugins={[Captions]}
            on={{
              view: ({ index }) => setPhotoIndex(index),
            }}
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              },
              navigation: { color: "#8b5cf6" },
            }}
            controller={{
              closeOnBackdropClick: true,
            }}
          />
        </div>
      </div>
      {/* tentang */}
      {/* proyek */}
      <div className="proyek mt-32 py-10" id="proyek">
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          Proyek
        </h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
          Berikut ini beberapa proyek yang telah saya buat
        </p>
        <div className="proyek-box mt-14 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4">
          {listProyek.map((proyek) => (
            <div key={proyek.id} className="p-4 bg-zinc-800 rounded-md" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={proyek.dad} data-aos-once="true">
              <img src={proyek.gambar} alt="nama" loading="lazy" />
              <div>
                <h1 className="text-2xl font-bold my-4"> {proyek.nama} </h1>
                <p className="text-base/loose mb-4">{proyek.desk}</p>
              </div>
              <div className="mt-8 text-center">
                <a href={proyek.link} target="_blank" rel="noopener noreferrer" className="bg-violet-700 p-3 rounded-lg block border border-zinc-600 hover:bg-violet-600">
                  lihat
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* proyek */}

{/* titl Card */}
<div className="tilt-section mt-32 py-10" id="hobi-minat">
  <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
    Hobi & Minat Saya
  </h1>
  <p className="text-base/loose text-center opacity-50 mb-14" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
    Hal-hal yang saya nikmati di luar aktivitas coding dan dunia digital
  </p>
  
  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
    {/* Card 1 - Musik */}
    <TiltCard>
      <div className="bg-linear-to-br from-violet-600 to-purple-800 p-6 rounded-2xl text-white h-80 flex flex-col justify-center items-center text-center">
        <i className="ri-music-2-line ri-4x mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">Mendengarkan Musik</h3>
        <p className="opacity-90">
          Menikmati berbagai genre musik untuk meningkatkan fokus, kreativitas, serta suasana hati dalam aktivitas sehari-hari.
        </p>
      </div>
    </TiltCard>

    {/* Card 2 - Film */}
    <TiltCard>
      <div className="bg-linear-to-br from-blue-600 to-cyan-600 p-6 rounded-2xl text-white h-80 flex flex-col justify-center items-center text-center">
        <i className="ri-movie-2-line ri-4x mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">Menonton Film</h3>
        <p className="opacity-90">
          Tertarik pada alur cerita dan visual sinematik yang dapat memberikan inspirasi serta sudut pandang baru.
        </p>
      </div>
    </TiltCard>

    {/* Card 3 - Mendaki */}
    <TiltCard>
      <div className="bg-linear-to-br from-amber-600 to-orange-600 p-6 rounded-2xl text-white h-80 flex flex-col justify-center items-center text-center">
        <i className="ri-tent-fill ri-4x mb-4"></i>
        <h3 className="text-2xl font-bold mb-2">Mendaki Gunung</h3>
        <p className="opacity-90">
          Melakukan kegiatan mendaki untuk menikmati alam, melatih ketahanan diri, serta menjaga keseimbangan antara aktivitas digital dan fisik.
        </p>
      </div>
    </TiltCard>
  </div>

  {/* Catatan kecil untuk mobile */}
  <p className="text-center text-sm opacity-50 mt-8 md:hidden block">
    Tap card untuk efek sentuh
  </p>
</div>
{/* titl Card */}

      {/* kontak */}
      <div className="kontak mt-32 sm:p-10 p-0" id="kontak">
        <h1 className="text-4xl mb-2 font-bold text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          Kontak
        </h1>
        <p className="text-base/loose text-center mb-10 opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
          mari terhubung dengan saya
        </p>
        <form onSubmit={handleSubmit} className="bg-zinc-800 p-10 sm:w-fit w-full mx-auto rounded-md" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Nama Lengkap</label>
              <input type="text" name="from_name" placeholder="Masukan Nama..." className="border border-zinc-500 p-2 rounded-md" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email</label>
              <input type="email" name="from_email" placeholder="Masukan email..." className="border border-zinc-500 p-2 rounded-md" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="pesan" className="font-semibold">
                Pesan
              </label>
              <textarea name="message" id="pesan" cols="45" rows="7" placeholder="Pesan" className="border border-zinc-500 p-2 rounded-md" required></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSending}
                className="bg-violet-700 p-3 rounded-lg w-full cursor-pointer border border-zinc-600 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <i className="ri-loader-4-line ri-lg animate-spin"></i>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    Kirim Pesan <i className="ri-send-plane-line"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* kontak */}
    </>
  );
}

export default App;
