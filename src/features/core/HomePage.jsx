import {
  ArrowRight,
  Book,
  Cloud,
  Code2,
  DollarSign,
  FileText,
  Grid,
  HeartHandshake,
  Keyboard,
  LetterText,
  Mic,
  Palette,
  Search,
  Settings2,
  Sigma,
  Sparkles,
  Star,
  Type,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { getAuthenticatedUser } from "../../firebase/services";
import { useThemeStore } from "../../store/themeStore";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import FadeAnimation from "../components/FadeAnimation";

function HomePage({ redirect }) {
  const navigate = useNavigate();

  const { theme } = useThemeStore();

  useEffect(() => {
    if (redirect) {
      getAuthenticatedUser().then((result) => {
        if (result == APP_CONSTANTS.UNAUTHENTICATED) {
          return;
        } else {
          navigate("/dashboard");
        }
      });
    }
  }, [navigate]);

  return (
    <div className="overflow-x-hidden font-jakarta h-[100vh] overflow-y-scroll scroll-smooth scrollbar-thin">
      <FadeAnimation from={"top"}>
        <NavBar></NavBar>
      </FadeAnimation>
      <div className="px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-50">
        <div className="mt-20 md:mt-40 flex flex-col">
          <FadeAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Bring clarity to your thoughts.
            </h1>
          </FadeAnimation>
          <FadeAnimation>
            <p className="max-w-120 mt-10 text-xl text-secondary">
              Craft and organize your thoughts in a space built for clarity,
              speed, and creativity. Free. Cloud-based. Feature-packed. Fully
              yours.
            </p>
          </FadeAnimation>
          <FadeAnimation>
            <div className="mt-10 flex gap-4 flex-col sm:flex-row">
              <Link
                className="btn btn-primary border-1 border-accent"
                to={"/signup"}
              >
                Start taking notes <ArrowRight size={20} />
              </Link>
              <Link
                className="btn border-1 border-accent"
                onClick={() => {
                  const el = document.getElementById("features");
                  el.scrollIntoView({ behavior: "smooth" });
                }}
                to={"#features"}
              >
                <Sparkles size={20} />
                Explore features
              </Link>
            </div>
          </FadeAnimation>

          <FadeAnimation>
            <div className="mt-20 md:mt-40 flex flex-col items-center text-center">
              <div className="">
                <img
                  className="rounded-lg"
                  src={theme == "dark" ? "/dark.png" : "/light.png"}
                  alt="A screenshot of Nebula's user interface"
                />
              </div>
            </div>
          </FadeAnimation>

          {/* Features */}

          <div
            id="features"
            className="mt-20 md:mt-40 flex flex-col items-center text-center"
          >
            <FadeAnimation>
              <h1 className="text-3xl md:text-4xl font-bold">
                Packed with features
              </h1>
            </FadeAnimation>
            <div className="mt-10 grid xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Rich Text Formatting"}
                  body={
                    "Create structured notes with support for headings, bold, underline, quotes, code blocks, tables, and more — all accessible via intuitive controls and shortcuts."
                  }
                  icon={<Type />}
                />
              </FadeAnimation>
              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Smart Speech Recognition"}
                  body={
                    "Convert your spoken words into text effortlessly with Nebula’s built-in speech recognition, perfect for capturing ideas quickly without typing."
                  }
                  icon={<Mic />}
                />
              </FadeAnimation>
              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Markdown Support"}
                  body={
                    "Write with Markdown for quick, clean formatting and export your notes as Markdown files with perfect styling, ready for sharing or publishing anywhere."
                  }
                  icon={<FileText />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Beautiful Math"}
                  body={
                    "Use LaTeX-style math rendering to add complex equations and formulas to your notes, ideal for students, researchers, and professionals."
                  }
                  icon={<Sigma />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Auto Formatting"}
                  body={
                    "Nebula automatically formats lists, spacing, and indentation as you type, keeping your notes clean and well-structured without extra effort. Manual formatting supported as well."
                  }
                  icon={<Settings2 />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Notebook System"}
                  body={
                    "Organize notes by grouping them into notebooks with tags and filters, and switch between grid and table views for easy management."
                  }
                  icon={<Book />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Powerful Organization"}
                  body={
                    "Pin notes, tag them, and sort your notebooks effortlessly to keep your important information front and center at all times."
                  }
                  icon={<Grid />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Fast Search"}
                  body={
                    "Quickly find notes using advanced search with support for tags and notebook filters, delivering precise results blazingly fast."
                  }
                  icon={<Search />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Beautiful Themes"}
                  body={
                    "Choose from multiple themes designed for comfort and focus, including light and dark modes for different working environments."
                  }
                  icon={<Palette />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Handy Keyboard Shortcuts"}
                  body={
                    "Work faster with customizable keyboard shortcuts for creating, editing, navigating, and saving notes, designed to keep your workflow smooth."
                  }
                  icon={<Keyboard />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Real-Time Word Count"}
                  body={
                    "Track your writing progress with live word count, perfect for staying on top of writing goals."
                  }
                  icon={<LetterText />}
                />
              </FadeAnimation>

              <FadeAnimation applyMinimumHeight={true}>
                <FeatureCard
                  title={"Quick Actions"}
                  body={
                    "Access common tasks like creating notes or viewing recent activity instantly from your dashboard with one-click quick actions."
                  }
                  icon={<Zap />}
                />
              </FadeAnimation>
            </div>
          </div>

          <div className="mt-20 md:mt-40 flex flex-row-reverse items-center justify-between">
            <div className="">
              <FadeAnimation from={"right"}>
                <h1 className="text-center md:text-left text-3xl md:text-4xl font-bold">
                  Cloud based & Secure
                </h1>
              </FadeAnimation>
              <FadeAnimation>
                <div className="mt-10">
                  <p className="md:max-w-110 lg:max-w-150 text-xl text-secondary">
                    Nebula securely backs up your notes to the cloud whenever
                    you hit save, giving you full control while keeping your
                    work safe. Cloud storage is completely free* for all users,
                    made possible by community donations. *Terms and conditions
                    apply.
                  </p>
                </div>
              </FadeAnimation>
            </div>
            <FadeAnimation from={"left"}>
              <div className="hidden md:flex items-center p-0 xl:p-15 2xl:p-20 xl:border-1 border-accent rounded-lg xl:bg-base-300">
                <Cloud size={120} />
              </div>
            </FadeAnimation>
          </div>

          <div className="mt-20 md:mt-40 flex items-center justify-between">
            <div className="">
              <FadeAnimation from={"left"}>
                <h1 className="text-center md:text-left text-3xl md:text-4xl font-bold">
                  Open Source
                </h1>
              </FadeAnimation>
              <div className="mt-10">
                <FadeAnimation>
                  <p className="md:max-w-110 lg:max-w-150 text-xl text-secondary">
                    Nebula is built for the community — no subscriptions, no
                    paywalls. You can view, use, and contribute to the entire
                    codebase on GitHub.
                  </p>
                  <Link
                    className="btn mt-4 border-1 border-accent w-full sm:w-fit"
                    to={"https://github.com/delta6626/nebula"}
                    target="_blank"
                  >
                    Star on GitHub <Star size={20} />
                  </Link>
                </FadeAnimation>
              </div>
            </div>
            <FadeAnimation from={"right"}>
              <div className="hidden md:flex items-center p-0 xl:p-15 2xl:p-20 xl:border-1 border-accent rounded-lg xl:bg-base-300">
                <Code2 size={120} />
              </div>
            </FadeAnimation>
          </div>

          <div className="mt-20 md:mt-40 flex flex-row-reverse items-center justify-between">
            <div className="">
              <FadeAnimation from={"right"}>
                <h1 className="text-center md:text-left text-3xl md:text-4xl font-bold">
                  Free Cloud Storage
                </h1>
              </FadeAnimation>
              <FadeAnimation>
                <div className="mt-10">
                  <p className="md:max-w-110 lg:max-w-150 text-xl text-secondary">
                    Nebula offers free cloud storage for your notes — no
                    subscriptions, no hidden fees. Just hit save and your work
                    is securely backed up. This is possible thanks to a
                    donation-supported model. We don’t charge for storage, but
                    running servers isn't free — your support helps keep Nebula
                    open and sustainable for everyone.
                  </p>
                  <Link
                    className="btn mt-4 border-1 border-accent w-full sm:w-fit"
                    to={"https://ko-fi.com/hasan04"}
                    target="_blank"
                  >
                    Support Nebula <HeartHandshake size={20} />
                  </Link>
                </div>
              </FadeAnimation>
            </div>
            <FadeAnimation from={"left"}>
              <div className="hidden md:flex items-center p-0 xl:p-15 2xl:p-20 xl:border-1 border-accent rounded-lg xl:bg-base-300">
                <DollarSign size={120} />
              </div>
            </FadeAnimation>
          </div>

          <div id="faq" className="mt-20 md:mt-40 flex flex-col items-center">
            <FadeAnimation>
              <h1 className="text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h1>
            </FadeAnimation>
            <div className="mt-10 w-full flex flex-col gap-4">
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title font-semibold text-xl">
                    1. What platforms does Nebula support?
                  </div>
                  <div className="collapse-content text-secondary">
                    Nebula is currently optimized for desktop browsers. Mobile
                    support is coming soon!
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    2. Is Nebula really free to use?
                  </div>
                  <div className="collapse-content text-secondary">
                    Yes! Nebula offers completely free cloud storage for your
                    notes with no subscriptions or hidden fees. While the app
                    remains free to use, unusually heavy usage may be subject to
                    limits to keep things sustainable for everyone.You can read
                    more about this on our{" "}
                    <Link className="text-primary" to={"terms-of-service"}>
                      Terms of Service
                    </Link>
                    .
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    3. Can I export my notes?
                  </div>
                  <div className="collapse-content text-secondary">
                    Absolutely! You can export your notes as Markdown files,
                    perfect for sharing or integrating with other tools.
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    4. Is my data safe and private?
                  </div>
                  <div className="collapse-content text-secondary">
                    Yes. Nebula prioritizes your privacy and security. Your
                    notes are stored securely in the cloud. We never view or
                    share your notes. Our{" "}
                    <Link className="text-primary" to={"terms-of-service"}>
                      Terms of Service
                    </Link>{" "}
                    strictly forbid it. We believe in trust, transparency, and
                    respecting your space.
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    5. What happens if I don't donate?
                  </div>
                  <div className="collapse-content text-secondary">
                    Donations help keep Nebula free and running smoothly. While
                    the app remains free to use, unusually heavy usage may be
                    subject to limits to keep things sustainable for everyone.
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    6. Are there plans to offer a paid model?
                  </div>
                  <div className="collapse-content text-secondary">
                    Not right now. If the community loves Nebula and there's
                    clear demand for more advanced features, we may explore a
                    paid version in the future. But for now, everything is
                    completely free.
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    7. Who's the developer?
                  </div>
                  <div className="collapse-content text-secondary">
                    Hi! My name is Hasan, and I'm the developer. Nebula is a
                    personal project crafted with care to help others think
                    better and write more freely. You can learn more about me{" "}
                    <Link
                      className="text-primary"
                      target="_blank"
                      to={"https://github.com/delta6626"}
                    >
                      here.
                    </Link>
                  </div>
                </div>
              </FadeAnimation>
              <FadeAnimation>
                <div className="collapse collapse-arrow border border-accent">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title font-semibold text-xl">
                    8. How can I contact Nebula?
                  </div>
                  <div className="collapse-content text-secondary">
                    You can reach out anytime via{" "}
                    <Link
                      className="text-primary"
                      to={"mailto:hasan04.asm@gmail.com"}
                      target={"_blank"}
                    >
                      email
                    </Link>
                    ,{" "}
                    <Link
                      className="text-primary"
                      to={"https://x.com/delta6626"}
                      target={"_blank"}
                    >
                      X / twitter
                    </Link>
                    , or{" "}
                    <Link
                      className="text-primary"
                      to={"https://github.com/delta6626"}
                      target={"_blank"}
                    >
                      GitHub
                    </Link>
                    .
                  </div>
                </div>
              </FadeAnimation>
            </div>
          </div>

          <div className="mt-20 md:mt-40 flex flex-col items-center sm:text-center">
            <FadeAnimation>
              <h1 className="text-3xl md:text-4xl font-bold">
                Ready to get organized?
              </h1>
            </FadeAnimation>
            <FadeAnimation from={"right"}>
              <p className="max-w-150 mt-10 text-xl text-secondary">
                Take control of your notes with Nebula — free, simple and fully
                yours. Start creating, organizing, and finding your ideas
                effortlessly today.
              </p>
            </FadeAnimation>
            <FadeAnimation from={"left"}>
              <Link
                className="btn btn-primary mt-10 border-1 border-accent w-full sm:w-fit"
                to={"/signup"}
              >
                Get started <ArrowRight size={20} />
              </Link>
            </FadeAnimation>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 md:mt-40">
        <FadeAnimation>
          <Footer></Footer>
        </FadeAnimation>
      </div>
    </div>
  );
}

export default HomePage;
