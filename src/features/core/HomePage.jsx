import NavBar from "../components/NavBar";
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
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { useThemeStore } from "../../store/themeStore";

function HomePage() {
  const { theme } = useThemeStore();

  return (
    <div className="font-jakarta scroll-smooth scrollbar-thin">
      <NavBar></NavBar>
      <div className="px-80">
        <div className="mt-40 flex flex-col">
          <h1 className="text-6xl font-bold">
            Bring clarity to your <br />
            thoughts.
          </h1>
          <p className="mt-10 text-xl text-gray-400">
            Craft and organize your thoughts in a space
            <br />
            built for clarity, speed, and creativity.
            <br />
            Free. Cloud-based. Feature-packed.
            <br />
            Fully yours.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              className="btn btn-primary border-1 border-accent"
              to={"/signup"}
            >
              Start taking notes <ArrowRight size={20} />
            </Link>
            <button
              className="btn border-1 border-accent"
              onClick={() => {
                const el = document.getElementById("features");
                el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles size={20} />
              Explore features
            </button>
          </div>

          <div className="mt-40 flex flex-col items-center text-center">
            <img
              className="rounded-lg shadow"
              src={theme == "dark" ? "/dark.png" : "/light.png"}
            />
          </div>

          {/* Features */}

          <div
            id="features"
            className="mt-40 flex flex-col items-center text-center"
          >
            <h1 className="text-4xl font-bold">Packed with features</h1>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <FeatureCard
                title={"Rich Text Formatting"}
                body={
                  "Create structured notes with support for headings, bold, underline, quotes, code blocks, tables, and more — all accessible via intuitive controls and shortcuts."
                }
                icon={<Type />}
              />
              <FeatureCard
                title={"Smart Speech Recognition"}
                body={
                  "Convert your spoken words into text effortlessly with Nebula’s built-in speech recognition, perfect for capturing ideas quickly without typing."
                }
                icon={<Mic />}
              />
              <FeatureCard
                title={"Markdown Support"}
                body={
                  "Write with Markdown for quick, clean formatting and export your notes as Markdown files with perfect styling, ready for sharing or publishing anywhere."
                }
                icon={<FileText />}
              />
              <FeatureCard
                title={"Beautiful Math"}
                body={
                  "Use LaTeX-style math rendering to add complex equations and formulas to your notes, ideal for students, researchers, and professionals."
                }
                icon={<Sigma />}
              />
              <FeatureCard
                title={"Auto Formatting"}
                body={
                  "Nebula automatically formats lists, spacing, and indentation as you type, keeping your notes clean and well-structured without extra effort. Manual formatting supported as well."
                }
                icon={<Settings2 />}
              />
              <FeatureCard
                title={"Notebook System"}
                body={
                  "Organize notes by grouping them into notebooks with tags and filters, and switch between grid and table views for easy management."
                }
                icon={<Book />}
              />
              <FeatureCard
                title={"Powerful Organization"}
                body={
                  "Pin notes, tag them, and sort your notebooks effortlessly to keep your important information front and center at all times."
                }
                icon={<Grid />}
              />
              <FeatureCard
                title={"Fast Search"}
                body={
                  "Quickly find notes using advanced search with support for tags and notebook filters, delivering precise results blazingly fast."
                }
                icon={<Search />}
              />
              <FeatureCard
                title={"Beautiful Themes"}
                body={
                  "Choose from multiple themes designed for comfort and focus, including light and dark modes for different working environments."
                }
                icon={<Palette />}
              />
              <FeatureCard
                title={"Handy Keyboard Shortcuts"}
                body={
                  "Work faster with customizable keyboard shortcuts for creating, editing, navigating, and saving notes, designed to keep your workflow smooth."
                }
                icon={<Keyboard />}
              />
              <FeatureCard
                title={"Real-Time Word Count"}
                body={
                  "Track your writing progress with live word count, perfect for staying on top of writing goals."
                }
                icon={<LetterText />}
              />
              <FeatureCard
                title={"Quick Actions"}
                body={
                  "Access common tasks like creating notes or viewing recent activity instantly from your dashboard with one-click quick actions."
                }
                icon={<Zap />}
              />
            </div>
          </div>

          <div
            id="features"
            className="mt-40 flex flex-row-reverse items-center justify-between"
          >
            <div className="">
              <h1 className="text-4xl font-bold">Cloud based & Secure</h1>
              <div className="mt-10">
                <p className="max-w-150 text-xl text-gray-400">
                  Nebula securely backs up your notes to the cloud whenever you
                  hit save, giving you full control while keeping your work
                  safe. Cloud storage is completely free* for all users, made
                  possible by community donations. *Terms and conditions apply.
                </p>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg bg-base-300">
              <Cloud size={120} />
            </div>
          </div>

          <div className="mt-40 flex items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold">Open Source</h1>
              <div className="mt-10">
                <p className="max-w-150 text-xl text-gray-400">
                  Nebula is built for the community — no subscriptions, no
                  paywalls. You can view, use, and contribute to the entire
                  codebase on GitHub.
                </p>
                <Link
                  className="btn mt-4 border-1 border-accent"
                  to={"https://github.com/delta6626/nebula"}
                  target="_blank"
                >
                  Star on GitHub <Star size={20} />
                </Link>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg bg-base-300">
              <Code2 size={120} />
            </div>
          </div>

          <div className="mt-40 flex flex-row-reverse items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold">
                Free Cloud Storage, Powered by You
              </h1>
              <div className="mt-10">
                <p className="max-w-150 text-xl text-gray-400">
                  Nebula offers free cloud storage for your notes — no
                  subscriptions, no hidden fees. Just hit save and your work is
                  securely backed up. This is possible thanks to a
                  donation-supported model. We don’t charge for storage, but
                  running servers isn't free — your support helps keep Nebula
                  open and sustainable for everyone.
                </p>
                <Link
                  className="btn mt-4 border-1 border-accent"
                  to={"https://ko-fi.com/hasan04"}
                  target="_blank"
                >
                  Support Nebula <HeartHandshake size={20} />
                </Link>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg bg-base-300">
              <DollarSign size={120} />
            </div>
          </div>

          <div id="faq" className="mt-40 flex flex-col items-center">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            <div className="mt-10 w-full flex flex-col gap-4">
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold text-xl">
                  1. What platforms does Nebula support?
                </div>
                <div className="collapse-content text-gray-400">
                  Nebula is currently optimized for desktop browsers. Mobile
                  support is coming soon!
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  2. Is Nebula really free to use?
                </div>
                <div className="collapse-content text-gray-400">
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
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  3. Can I export my notes?
                </div>
                <div className="collapse-content text-gray-400">
                  Absolutely! You can export your notes as Markdown files,
                  perfect for sharing or integrating with other tools.
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  4. Is my data safe and private?
                </div>
                <div className="collapse-content text-gray-400">
                  Yes. Nebula prioritizes your privacy and security. Your notes
                  are stored securely in the cloud.we never view or share your
                  notes. Our Terms of Service strictly forbid it. We believe in
                  trust, transparency, and respecting your space.
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  5. What happens if I don't donate?
                </div>
                <div className="collapse-content text-gray-400">
                  Donations help keep Nebula free and running smoothly. While
                  the app remains free to use, unusually heavy usage may be
                  subject to limits to keep things sustainable for everyone.
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  6. Are there plans to offer a paid model?
                </div>
                <div className="collapse-content text-gray-400">
                  Not right now. If the community loves Nebula and there's clear
                  demand for more advanced features, we may explore a paid
                  version in the future. But for now, everything is completely
                  free.
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  7. Who's behind Nebula?
                </div>
                <div className="collapse-content text-gray-400">
                  Hi! My name is Hasan, and I'm the developer. Nebula is a
                  personal project crafted with care to help others think better
                  and write more freely. You can learn more about me{" "}
                  <Link className="text text-primary">here.</Link>
                </div>
              </div>
              <div className="collapse collapse-arrow border border-accent">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold text-xl">
                  8. How can I contact Nebula?
                </div>
                <div className="collapse-content text-gray-400">
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
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">Ready to get organized?</h1>
            <p className="max-w-150 mt-10 text-xl text-gray-400">
              Take control of your notes with Nebula — free, simple and fully
              yours. Start creating, organizing, and finding your ideas
              effortlessly today.
            </p>
            <Link
              className="btn btn-primary mt-10 border-1 border-accent"
              to={"/signup"}
            >
              Get started <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-40">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default HomePage;
