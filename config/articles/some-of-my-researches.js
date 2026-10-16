window.ARTICLE = {
  title: "Some of My Researches",   // defaults to the project name
  category: "Reinforcement Learning / Machine Learning / Traffic Optimization",  // optional: shown under the title
  author: "Valk",
  date: "June 2026",
  tags: ["Reinforcement Learning", "Machine Learning", "Traffic Optimization", "Simulation"],
  contents: true,                                  // set false to hide the Contents box
  contentsTitle: "Contents",
  series: [                                        // optional: links to other parts
    { label: "", href: "project.html?id=some-of-my-researches" }
  ],
  cover: "",                                       // optional wide image under the title

  blocks: [
    { type: "heading", text: "1. IMPLEMENTING REINFORCEMENT Q-LEARNING IN TRAFFIC SIGNAL OPTIMIZATION FOR ONE INTERSECTION" },
    { type: "paragraph", text: "As the population increases, urban intersections are becoming critical nodes within modern traffic systems and play an important role in the logistics and supply networks. However, these pivotal hubs are often plagued by congestion and inefficiency. Mostly controlled by fixed-cycle programs, these traditional traffic signals lack the adaptability to accommodate dynamic changes in traffic flow, leading to increased emissions, delays, and wasted fuel - which directly impact to delivery costs and effcientcy. For these aforementioned reasons, growing the need for an adaptive traffic light control models that can quickly respond to real-time traffic changes. As artificial intelligence advances in every daily aspects, its applicationsin smart traffic management brings hope for a new and modern solution to this urban problem. This study presents a Q-learning-based approach for optimizing traffic signal durations at a four-way intersection. By leveraging reinforcement learning, the model learns to adjust traffic light timings dynamically to balance traffic density across all lanes, prioritize congested roads, and maximize overall throughput. The Q-learning based agent will learn through interacting actions with its environment and using a Q-table to store and update calculated Q-values. The agent can then take actions that either maximize cumulative rewards over time or satisfy any specified requirement. A simulation environment using SUMO (Simulation of Urban Mobility) evaluates the proposed model against traditional fixed-timing systems. Results demonstrate significant improvements in average speed, congestion levels, and waiting times. The findings highlight the potential of Q-learning in traffic management, contributing to smarter and more sustainable flow of goods as well as urban mobility solutions."},
    { type: "pdf", src: "../assets/reinforcement_learning_for_1_intersection.pdf", label: "Tài liệu 1:", caption: "paper_1", height: 700 },

    { type: "heading", text: "2. Short-Term Traffic Flow Forecasting with XGBoost and Traffic Condition Classification via Gradient Boosting Machines" },
    { type: "paragraph", text: "This paper presents a short-term traffic flow prediction and traffic situation classification approach using XGBoost and Gradient Boosting Machines (GBM). The proposed methodology leverages historical traffic flow data and time-related features to accurately forecast traffic flow and classify traffic conditions. Experiments on a real-world dataset and simulations in the SUMO environment demonstrate the effectiveness of the approach. The method shows promise for enhancing intelligent transportation systems and aiding in proactive traffic management."},
    { type: "pdf", src: "../assets/traffic_flow_prediction.pdf", label: "Tài liệu 2:", caption: "paper_2", height: 700 },
]
};