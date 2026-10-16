/* ============================================================
   ARTICLE FILE for the project with id "wireless-shelf-scale".
   One file per project: config/articles/<project id>.js
   Blocks render top to bottom. Block types:
     { type:"heading",    text:"1. Overview" }          -> big heading (appears in Contents)
     { type:"subheading", text:"Block diagram" }        -> smaller heading (nested in Contents)
     { type:"paragraph",  text:"Text. Supports `code`, **bold**, [link](https://...)" }
     { type:"list",       items:["one","two"], ordered:false }
     { type:"image",      src:"assets/pic.jpg", label:"Figure 1-1:", caption:"What it shows" }
     { type:"code",       code:"int main(void){}", label:"Listing 1:", caption:"What it does" }
   An image with src:"" shows a placeholder box.
   ============================================================ */
window.ARTICLE = {
  title: "Wireless Smart Shelf Scale",   // defaults to the project name
  category: "Embedded / IoT",
  author: "Valk",
  date: "June 2026",
  tags: ["firmware", "RF protocol", "testing"],
  contents: true,                                  // set false to hide the Contents box
  contentsTitle: "Contents",
  series: [                                        // optional: links to other parts
    { label: "", href: "project.html?id=wireless-shelf-scale" }
  ],
  cover: "",                                       // optional wide image under the title

  blocks: [
    { type: "heading", text: "1. Introduction" },
    { type: "paragraph", text: "This project was developed to improve warehouse inventory management and streamline shipping by providing accurate weight data for goods being transported. The system collects and transmits weight measurements wirelessly. It consists of fixed weighing modules for warehouse shelves and mobile modules for pallets carrying larger packages. The fixed module supports up to 32 scales through multiplexers, with configurable IDs for easier identification and tracking. I implemented a custom RF communication protocol with encryption, acknowledgments, timeouts, and retry mechanisms to improve communication reliability. A Master module connects to a PC to coordinate communication and collect weight data from the weighing modules. By using predefined unit weights, the system can also estimate item quantities from measured weights, reducing manual counting and improving inventory accuracy." },
    { type: "image", src: "assets/smartScaleAvatar.png", label: "Figure 1-1:", caption: "Photo of the finished device" },
    { type: "image", src: "assets/SmartScale.png", label: "Figure 1-2:", caption: "Connection diagram between devices" },

    { type: "heading", text: "2. System design" },

    { type: "subheading", text: "2.1. Slave Module" },
    { type: "paragraph", text: "The Slave module is built around an Arduino Mega 2560 Pro Mini, two pairs of 74HC4067 multiplexers, and an HC-12 wireless communication module. It supports up to 32 weighing scales, each consisting of a load cell connected to an HX711 amplifier. The multiplexers switch the HX711 data (DAT) and clock (SCK) signals, allowing the microcontroller to interface with multiple scales while minimizing GPIO usage. A 12V DC input is regulated to 5V by a DC-DC buck converter to power the microcontroller, multiplexers, HX711 modules, and wireless module. The Arduino manages sensor selection and acquires weight measurements from the connected scales sequentially. This modular architecture enables centralized management of multiple weighing points through a single Slave device." },
    { type: "list", items: ["MCU: Arduino Mega 2560 Pro Mini", "Load cell + ADC: HX711", "RF module: HC-12", "Multiplexers: 74HC4067"] },
    { type: "image", src: "assets/SlaveModule.png", label: "Figure 2-1:", caption: "Architecture diagram of the Slave module" },

    { type: "subheading", text: "2.2. Mobile Module" },
    { type: "paragraph", text: "The Mobile module is designed for weighing large packages placed on mobile pallets and consists of an Arduino Nano, an HX711 amplifier, a load cell, and an HC-12 wireless communication module. The load cell measures the package weight, while the HX711 converts the sensor's analog signal into digital data for the microcontroller. The Arduino Nano processes the measurement and manages the weighing operations. The module is powered by a 3-cell lithium battery pack connected to a Battery Management System (BMS), with a DC-DC buck converter providing a regulated 5V supply to the electronic components. Its compact, self-powered architecture enables flexible weighing of large packages without requiring a fixed connection to the warehouse infrastructure." },
    { type: "image", src: "assets/MobileModule.png", label: "Figure 2-2:", caption: "Architecture diagram of the Mobile module" },
    
    { type: "subheading", text: "2.3. Master Module" },
    { type: "paragraph", text: "The Master module serves as the central communication interface between the warehouse weighing devices and a PC. It consists of an Arduino Mega 2560 Pro Mini and an HC-12 wireless communication module, enabling it to communicate with the Slave and Mobile modules over an RF link. The Arduino manages incoming requests and collects weight measurements from the connected weighing devices. It then forwards the acquired data to the PC through a serial connection for monitoring and further processing. This centralized architecture allows the PC to access measurements from both fixed warehouse scales and mobile pallet scales through a single Master device." },
    { type: "image", src: "assets/MasterModule.png", label: "Figure 2-3:", caption: "Architecture diagram of the Master module" },
    
    { type: "heading", text: "3. Protocol" },
    { type: "paragraph", text: "The communication protocol follows a broadcast-based command-and-feedback workflow. The Master generates a unique `id_command` and broadcasts a command containing the target `id_tray` to all connected nodes, periodically retransmitting it until a valid confirmation is received or the confirmation timeout is reached. Each node checks the received command and compares the specified `id_tray` with its assigned trays; only a matching node sends a confirmation containing the corresponding `id_command` and proceeds with execution. Once the Master receives a valid confirmation, it stops retransmitting the command and waits for the node to complete the operation and return feedback linked to the same `id_command`. If the feedback is received, the Master records the result and sends an acknowledgment to stop further feedback retransmissions. If a packet or acknowledgment is lost, the sender retries according to the configured retry limit, while duplicate commands and feedback are handled without repeating completed operations or processing results multiple times. The Master logs errors when confirmation or feedback timeouts occur, while exhausted acknowledgment retries are recorded as an unconfirmed delivery status. This mechanism improves communication reliability and enables the system to track each command throughout its lifecycle." },
    { type: "image", src: "assets/Protocol.png", label: "Figure 3-1:", caption: "Protocol diagram" },

    { type: "heading", text: "4. Packet Structure and Encryption" },
    { type: "subheading", text: "4.1. Packet Structure" },
    { type: "paragraph", text: "The communication protocol uses a structured packet format consisting of six fields: SOF (2 bytes), LEN (2 bytes), ID_MASTER (3 bytes), ID_COMMAND (2 bytes), PAYLOAD (variable length), and CRC7 (2 bytes). SOF marks the beginning of a packet, while LEN specifies the length of the packet content from the header through the payload, excluding SOF and CRC7. ID_MASTER identifies the Master device, and ID_COMMAND identifies the command or transaction. PAYLOAD contains Base64-encoded data and may include additional fields, such as ID_TRAY or ID_NODE, for specific commands. CRC7 is calculated over LEN, the entire header, and PAYLOAD to detect transmission errors and protect the integrity of these fields against accidental corruption. The packet uses length-based framing, so a newline terminator is not required." },
    { type: "image", src: "assets/packet_format.png", label: "Figure 4-1:", caption: "Packet structure diagram" },
    { type: "subheading", text: "4.2. Encode and Decode flow" },
    { type: "paragraph", text: "During encoding, the sender prepares the command payload, serializes it into bytes if necessary, and encodes the payload using Base64. It then constructs the header containing ID_MASTER and ID_COMMAND, calculates CRC7 over LEN, the header, and the encoded payload, and assembles the complete packet in the order SOF, LEN, header, payload, and CRC7 before transmitting it through the HC-12 module. At the receiving end, the device detects SOF, reads LEN, and collects the remaining bytes according to the specified packet length. It recalculates CRC7 over the same fields and compares the result with the received CRC7. If the values do not match, the packet is discarded; otherwise, the receiver parses the header, decodes the Base64 payload, validates the command data, and proceeds with the corresponding operation. This mechanism helps detect accidental transmission errors, although CRC7 and Base64 alone do not provide cryptographic security or protection against intentional packet modification."},
    { type: "image", src: "assets/encode_decode.png", label: "Figure 4-2:", caption: "Encode and Decode flow diagram" },
  
    { type: "heading", text: "5. Conclusion" },
    { type: "paragraph", text: "This project was independently developed by a single developer to address practical weighing and inventory management needs. While the system has achieved its primary functional objectives, it is acknowledged that the current implementation still has limitations, technical imperfections, and significant room for improvement in areas such as communication reliability, error handling, scalability, and overall system robustness. At its current stage, the system is intended primarily for internal use and deployment with a small number of trusted customers. It has not yet been released as a commercially available product. Further testing, refinement, and development are required before it can be considered ready for broader commercial deployment." }
  ]
};