window.ARTICLE = {
  title: "My TOEIC Certificate",   // defaults to the project name
  category: "English Proficiency",  // optional: shown under the title
  author: "Valk",
  date: "June 2026",
  tags: ["English", "Certification", "Proficiency"],
  contents: true,                                  // set false to hide the Contents box
  contentsTitle: "Contents",
  series: [                                        // optional: links to other parts
    { label: "", href: "project.html?id=toeic-cert" }
  ],
  cover: "",                                       // optional wide image under the title

  blocks: [
    { type: "heading", text: "MY TOEIC CERTIFICATE" },
    { type: "paragraph", text: "This is a small proof of my English proficiency. I can read and write technical documents in English, and can communicate with foreign colleagues."},
    { type: "image", src: "../assets/TOEIC_cert.jpg", label: "My TOEIC Certificate", caption: "toeic_cert", height: 700 }
    ]
};