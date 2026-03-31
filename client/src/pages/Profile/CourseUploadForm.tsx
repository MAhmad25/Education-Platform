import { useState } from "react";

interface Module {
  id: string;
  title: string;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  skillLevel: string;
  thumbnail: File | null;
  previewVideoUrl: string;
  modules: Module[];
  isFree: boolean;
  price: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  skillLevel?: string;
  price?: string;
}

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "DevOps",
  "Machine Learning",
];

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function CourseUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    skillLevel: "",
    thumbnail: null,
    previewVideoUrl: "",
    modules: [{ id: "1", title: "" }],
    isFree: false,
    price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [thumbnailName, setThumbnailName] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.skillLevel) {
      newErrors.skillLevel = "Skill level is required";
    }

    if (!formData.isFree && !formData.price.trim()) {
      newErrors.price = "Price is required for paid courses";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Course published successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        skillLevel: "",
        thumbnail: null,
        previewVideoUrl: "",
        modules: [{ id: "1", title: "" }],
        isFree: false,
        price: "",
      });
      setThumbnailName("");
      setErrors({});
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailName(file?.name || "");
  };

  const handleModuleChange = (id: string, title: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => (m.id === id ? { ...m, title } : m)),
    }));
  };

  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, { id: Date.now().toString(), title: "" }],
    }));
  };

  const removeModule = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Course Details */}
      <div className="border-2 border-[#f9f5cb] p-6">
        <h3 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-6">
          [ COURSE DETAILS ]
        </h3>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full bg-transparent border-2 ${
                errors.title ? "border-red-500" : "border-[#f9f5cb]"
              } px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors`}
              placeholder="Enter course title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full bg-transparent border-2 ${
                errors.description ? "border-red-500" : "border-[#f9f5cb]"
              } px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors resize-none`}
              placeholder="Enter course description (min 50 characters)"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">{errors.description}</p>
            )}
          </div>

          {/* Category & Skill Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-2 ${
                  errors.category ? "border-red-500" : "border-[#f9f5cb]"
                } px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors appearance-none cursor-pointer`}
              >
                <option value="" className="bg-[#271814]">
                  Select category
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#271814]">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
                Skill Level *
              </label>
              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleInputChange}
                className={`w-full bg-transparent border-2 ${
                  errors.skillLevel ? "border-red-500" : "border-[#f9f5cb]"
                } px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors appearance-none cursor-pointer`}
              >
                <option value="" className="bg-[#271814]">
                  Select level
                </option>
                {SKILL_LEVELS.map((level) => (
                  <option key={level} value={level} className="bg-[#271814]">
                    {level}
                  </option>
                ))}
              </select>
              {errors.skillLevel && (
                <p className="text-red-500 text-sm mt-2">{errors.skillLevel}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Media */}
      <div className="border-2 border-[#f9f5cb] p-6">
        <h3 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-6">
          [ MEDIA ]
        </h3>

        <div className="space-y-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
              Thumbnail
            </label>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#f9f5cb] cursor-pointer hover:border-[#ff5718] transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 text-[#f9f5cb] mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-[#f9f5cb] text-sm">
                  {thumbnailName || "Drop thumbnail here or click to upload"}
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview Video URL */}
          <div>
            <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
              Preview Video URL
            </label>
            <input
              type="text"
              name="previewVideoUrl"
              value={formData.previewVideoUrl}
              onChange={handleInputChange}
              className="w-full bg-transparent border-2 border-[#f9f5cb] px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Section 3: Curriculum */}
      <div className="border-2 border-[#f9f5cb] p-6">
        <h3 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-6">
          [ CURRICULUM ]
        </h3>

        <div className="space-y-4">
          {formData.modules.map((module, index) => (
            <div key={module.id} className="flex gap-4">
              <span className="font-mono text-[#a1928b] py-3">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <input
                type="text"
                value={module.title}
                onChange={(e) => handleModuleChange(module.id, e.target.value)}
                className="flex-1 bg-transparent border-2 border-[#f9f5cb] px-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors"
                placeholder="Module title"
              />
              <button
                type="button"
                onClick={() => removeModule(module.id)}
                className="font-mono text-[#ff5718] border-2 border-[#ff5718] px-4 py-3 hover:bg-[#ff5718] hover:text-[#f9f5cb] transition-colors"
              >
                x
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addModule}
            className="font-mono text-sm uppercase tracking-wide border-2 border-[#f9f5cb] text-[#f9f5cb] px-6 py-3 hover:bg-[#f9f5cb] hover:text-[#271814] transition-colors"
          >
            [ ADD MODULE ]
          </button>
        </div>
      </div>

      {/* Section 4: Pricing */}
      <div className="border-2 border-[#f9f5cb] p-6">
        <h3 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-6">
          [ PRICING ]
        </h3>

        <div className="space-y-6">
          {/* Free Course Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, isFree: e.target.checked }));
                if (e.target.checked) {
                  setErrors((prev) => ({ ...prev, price: undefined }));
                }
              }}
              className="w-5 h-5 border-2 border-[#f9f5cb] accent-[#ff5718] cursor-pointer"
            />
            <span className="font-mono text-sm uppercase text-[#f9f5cb]">
              Free Course
            </span>
          </label>

          {/* Price Input */}
          <div>
            <label className="block font-mono text-sm uppercase text-[#f9f5cb] mb-2">
              Price {formData.isFree ? "" : "*"}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1928b] font-mono">
                $
              </span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                disabled={formData.isFree}
                className={`w-full bg-transparent border-2 ${
                  errors.price ? "border-red-500" : "border-[#f9f5cb]"
                } pl-10 pr-4 py-3 text-[#f9f5cb] outline-none focus:border-[#ff5718] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-2">{errors.price}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#ff5718] text-[#f9f5cb] uppercase font-mono py-4 text-lg tracking-widest border-2 border-[#ff5718] hover:bg-transparent hover:text-[#ff5718] transition-colors"
      >
        [ PUBLISH COURSE ]
      </button>
    </form>
  );
}
