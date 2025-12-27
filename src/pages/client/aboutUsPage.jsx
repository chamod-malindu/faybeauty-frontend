import {
  FaLeaf,
  FaHeart,
  FaGlobe,
  FaStar,
} from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="flex justify-center py-12 bg-primary">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-accent-hover text-white text-center py-12">
          <h1 className="text-4xl font-bold font-serif">About Faye Beauty</h1>
          <p className="mt-3 opacity-90 font-serif max-w-2xl mx-auto">
            Where beauty meets confidence, care, and elegance
          </p>
        </div>

        {/* About Content */}
        <div className="p-10 space-y-12">

          {/* Intro */}
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 font-serif mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Faye Beauty was created with a simple belief, everyone deserves to feel
              confident in their own skin. Our journey began with a passion for
              high-quality cosmetics that enhance natural beauty while caring for
              your skin.
            </p>
          </section>

          {/* Values */}
          <section className="grid md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 rounded-xl bg-pink-50 shadow-lg hover:shadow-xl">
              <FaLeaf className="text-accent-hover text-3xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Clean Ingredients
              </h3>
              <p className="text-gray-600 text-sm">
                Carefully selected ingredients that are gentle, safe, and
                skin-friendly.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-pink-50 shadow-lg hover:shadow-xl">
              <FaHeart className="text-accent-hover text-3xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Cruelty Free
              </h3>
              <p className="text-gray-600 text-sm">
                We believe in beauty without harm. No animal testing, ever.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-pink-50 shadow-lg hover:shadow-xl">
              <FaGlobe className="text-accent-hover text-3xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Made for Everyone
              </h3>
              <p className="text-gray-600 text-sm">
                Inclusive beauty designed for all skin tones and styles.
              </p>
            </div>

          </section>

          {/* Mission */}
          <section className="bg-pink-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 font-serif mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Our mission is to empower confidence through beauty. We strive to
              deliver premium cosmetics that combine elegance, quality, and
              innovation while staying true to our values of care and authenticity.
            </p>
          </section>

          {/* Trust */}
          <section className="text-center">
            <FaStar className="text-accent-hover text-4xl mx-auto mb-4" />
            <p className="text-gray-700 font-medium">
              Trusted by beauty lovers across Sri Lanka
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
