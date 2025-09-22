import ModuleLayout from './ModuleLayout'
import type { LearningModule } from './types'

const internetNetworkBasicsModule: LearningModule = {
  title: 'Internet and Network Basics',
  introduction: 'Welcome to the fascinating world of Internet and Network Basics! Have you ever wondered how you can instantly message a friend on the other side of the world, stream videos, or browse websites? The answer lies in the incredible network of connections that spans our entire planet. Networks and the Internet are like the nervous system of our digital world - they connect people, devices, and information across vast distances in milliseconds. Understanding how these systems work is crucial in today\'s connected world, where almost every device from smartphones to smart refrigerators is part of this global network. Get ready to explore the invisible highways that make our digital lives possible!',
  concepts: [
    {
      title: 'Definition and Types of Computer Networks',
      content: 'A computer network is a system of interconnected devices that can communicate and share resources with each other. Networks vary in size and scope, from connecting two computers in a room to connecting billions of devices worldwide.',
      examples: [
        'Local Area Network (LAN): Connects devices in a small area like a home, school, or office',
        'Example: Your home Wi-Fi network connecting laptops, phones, and smart TVs',
        'Wide Area Network (WAN): Spans large geographical areas, connecting multiple LANs',
        'Example: The Internet itself is the largest WAN connecting networks worldwide',
        'Metropolitan Area Network (MAN): Covers a city or large campus area',
        'Personal Area Network (PAN): Connects devices around an individual, like Bluetooth devices'
      ]
    },
    {
      title: 'Fundamental Concept of the Internet',
      content: 'The Internet is a global network of interconnected computer networks that use standardized communication protocols to link billions of devices worldwide. It\'s like a massive digital highway system that connects all networks into one unified system.',
      examples: [
        'Built on TCP/IP protocols that ensure reliable communication between devices',
        'Uses packet switching to break data into small chunks for efficient transmission',
        'Originally developed as ARPANET by the US Department of Defense in the 1960s',
        'Connects over 5 billion users and billions of devices worldwide',
        'Provides services like World Wide Web, email, file transfer, and video streaming',
        'Governed by organizations like ICANN and IETF that set standards and manage addresses'
      ]
    },
    {
      title: 'IP Addresses - Digital Postal Addresses',
      content: 'An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network. Like a postal address, it ensures data reaches the correct destination device.',
      examples: [
        'IPv4 format: Four numbers separated by dots (e.g., 192.168.1.1) - 32-bit addresses',
        'IPv6 format: Eight groups of four hexadecimal digits (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334) - 128-bit addresses',
        'Public IP: Unique address visible on the Internet (assigned by ISP)',
        'Private IP: Used within local networks (192.168.x.x, 10.x.x.x, 172.16.x.x to 172.31.x.x)',
        'Dynamic IP: Changes each time you connect to the Internet',
        'Static IP: Permanently assigned address that never changes'
      ]
    },
    {
      title: 'Domain Names - Human-Friendly Internet Addresses',
      content: 'A domain name is a user-friendly name that corresponds to an IP address. Instead of remembering complex numbers like 142.250.191.14, we use names like google.com.',
      examples: [
        'Structure: www.subdomain.domain.extension (e.g., www.mail.google.com)',
        'Top-level domains (TLDs): .com, .org, .net, .edu, .gov, country codes like .in, .uk',
        'Domain Name System (DNS): Translates domain names to IP addresses (like a phone book)',
        'When you type google.com, DNS servers find the corresponding IP address',
        'Subdomains: Additional divisions like mail.google.com or drive.google.com',
        'Registration: Domain names must be registered through accredited registrars'
      ]
    },
    {
      title: 'Web Browsers - Windows to the Digital World',
      content: 'A web browser is a software application that enables users to access, retrieve, and view content on the World Wide Web. It acts as an interpreter between users and web servers.',
      examples: [
        'Popular browsers: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera',
        'Functions: Render HTML, CSS, and JavaScript to display web pages',
        'Features: Tabs for multiple pages, bookmarks, history, downloads manager',
        'Security: Warn about unsafe sites, block malicious downloads, manage permissions',
        'Extensions/Add-ons: Enhance functionality with additional tools and features',
        'Updates: Regular security patches and feature improvements'
      ]
    },
    {
      title: 'Websites - Digital Destinations',
      content: 'A website is a collection of related web pages, images, videos, or other digital assets hosted on a web server and accessible via the Internet. Each website has a unique address (URL).',
      examples: [
        'Structure: Collection of HTML files, CSS for styling, JavaScript for interactivity',
        'Hosting: Stored on web servers that are always connected to the Internet',
        'Content Management Systems (CMS): Tools like WordPress for creating websites',
        'Static websites: Fixed content that doesn\'t change based on user interaction',
        'Dynamic websites: Content changes based on user input or database information',
        'Examples: Social media sites, online stores, news portals, educational platforms'
      ]
    },
    {
      title: 'Common Network Protocols - Communication Rules',
      content: 'Network protocols are standardized rules that determine how data is transmitted between devices in a network. They ensure devices can communicate effectively regardless of their manufacturer or operating system.',
      examples: [
        'TCP/IP (Transmission Control Protocol/Internet Protocol): Foundation of the Internet',
        'HTTP/HTTPS (HyperText Transfer Protocol): For web page transfers (secure version uses encryption)',
        'FTP (File Transfer Protocol): For uploading and downloading files to servers',
        'SMTP/POP3/IMAP: For sending and receiving email messages',
        'DNS (Domain Name System): Translates domain names to IP addresses',
        'DHCP (Dynamic Host Configuration Protocol): Automatically assigns IP addresses to devices'
      ]
    },
    {
      title: 'Network Hardware - Physical Connection Components',
      content: 'Network hardware consists of physical devices that enable communication between computers and other devices in a network. These components form the infrastructure of networks.',
      examples: [
        'Routers: Direct data between different networks, connect LANs to the Internet',
        'Switches: Connect multiple devices within a single network, manage local traffic',
        'Modems: Convert digital signals to analog for transmission over telephone lines',
        'Network Interface Cards (NICs): Enable devices to connect to networks',
        'Cables: Ethernet cables for wired connections, fiber optic for high-speed connections',
        'Wireless Access Points: Enable Wi-Fi connectivity for mobile devices'
      ]
    },
    {
      title: 'Advantages of Networks and the Internet',
      content: 'Networks and the Internet provide numerous benefits that have transformed how we work, learn, communicate, and entertain ourselves. These advantages have become essential in modern life.',
      examples: [
        'Resource sharing: Share printers, files, storage, and expensive software licenses',
        'Communication: Instant messaging, email, video calls across any distance',
        'Information access: Instant access to vast amounts of knowledge and data',
        'Collaboration: Work together on documents and projects in real-time',
        'E-commerce: Online shopping, banking, and business transactions',
        'Entertainment: Streaming music, videos, games, and social media',
        'Education: Online learning, research, and educational resources'
      ]
    },
    {
      title: 'Introduction to Cyber Safety in Network Context',
      content: 'Cyber safety in the context of networks and the Internet involves protecting yourself, your devices, and your data from online threats while using networked systems. Understanding network basics helps you make safer choices online.',
      examples: [
        'Secure connections: Look for HTTPS and lock icons in web browsers',
        'Public Wi-Fi risks: Avoid sensitive transactions on unsecured public networks',
        'Firewalls: Software that monitors and controls incoming and outgoing network traffic',
        'Antivirus software: Protects against malware that spreads through networks',
        'Strong passwords: Use unique, complex passwords for network accounts',
        'Network awareness: Understanding that your online activities leave digital traces'
      ]
    }
  ],
  mcqs: [
    {
      question: 'What is a computer network?',
      options: ['A single computer with multiple programs', 'A system of interconnected devices that can communicate and share resources', 'A type of computer virus', 'A software application'],
      correct: 1,
      explanation: 'A computer network is a system of interconnected devices that can communicate and share resources with each other, ranging from two computers in a room to billions of devices worldwide.'
    },
    {
      question: 'Which type of network connects devices in a small area like a home or school?',
      options: ['WAN (Wide Area Network)', 'MAN (Metropolitan Area Network)', 'LAN (Local Area Network)', 'PAN (Personal Area Network)'],
      correct: 2,
      explanation: 'A Local Area Network (LAN) connects devices in a small geographical area such as a home, school, or office building.'
    },
    {
      question: 'What is the primary function of an IP address?',
      options: ['To make websites look attractive', 'To uniquely identify each device connected to a network', 'To create passwords for accounts', 'To design web pages'],
      correct: 1,
      explanation: 'An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a network, ensuring data reaches the correct destination.'
    },
    {
      question: 'What is the main difference between an IP address and a domain name?',
      options: ['IP addresses are free while domain names cost money', 'IP addresses are numerical while domain names are human-readable text', 'Domain names are faster than IP addresses', 'There is no difference'],
      correct: 1,
      explanation: 'IP addresses are numerical labels (like 192.168.1.1) while domain names are human-readable text (like google.com). The Domain Name System (DNS) translates domain names to IP addresses.'
    },
    {
      question: 'What is the primary function of a web browser?',
      options: ['To create websites', 'To connect to the Internet', 'To access, retrieve, and view content on the World Wide Web', 'To send email messages'],
      correct: 2,
      explanation: 'A web browser is a software application that enables users to access, retrieve, and view content on the World Wide Web, interpreting HTML, CSS, and JavaScript to display web pages.'
    },
    {
      question: 'Which protocol is the foundation of the Internet?',
      options: ['HTTP', 'FTP', 'TCP/IP', 'SMTP'],
      correct: 2,
      explanation: 'TCP/IP (Transmission Control Protocol/Internet Protocol) is the foundational protocol suite that enables communication across the Internet.'
    },
    {
      question: 'What does DNS stand for and what does it do?',
      options: ['Digital Network System - manages network cables', 'Domain Name System - translates domain names to IP addresses', 'Data Network Security - protects against viruses', 'Digital Name Service - creates email addresses'],
      correct: 1,
      explanation: 'DNS stands for Domain Name System, which translates human-readable domain names (like google.com) into IP addresses that computers use to identify each other.'
    },
    {
      question: 'What is one major advantage of computer networks?',
      options: ['They make computers run slower', 'They eliminate the need for the Internet', 'They enable resource sharing and communication between devices', 'They require expensive hardware only'],
      correct: 2,
      explanation: 'Networks enable resource sharing (like printers and files) and communication between devices, making collaboration and information access much more efficient.'
    },
    {
      question: 'Which device directs data between different networks and connects LANs to the Internet?',
      options: ['Network Interface Card (NIC)', 'Switch', 'Router', 'Modem'],
      correct: 2,
      explanation: 'A router directs data between different networks and connects Local Area Networks (LANs) to the Internet, making it possible for devices on different networks to communicate.'
    },
    {
      question: 'What is an important cyber safety practice when using networks?',
      options: ['Share passwords with friends', 'Use public Wi-Fi for banking transactions', 'Look for HTTPS and lock icons for secure websites', 'Disable firewall protection'],
      correct: 2,
      explanation: 'Looking for HTTPS and lock icons in web browsers indicates a secure connection, which is an important cyber safety practice when transmitting sensitive information online.'
    }
  ]
}

export default function InternetNetworkBasicsModule() {
  return (
    <ModuleLayout 
      module={internetNetworkBasicsModule} 
      grade={10} 
      subject="Computer Science" 
    />
  )
}