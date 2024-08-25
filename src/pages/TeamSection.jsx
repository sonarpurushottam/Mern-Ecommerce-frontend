import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: '/images/team1.jpg' },
  { name: 'Jane Smith', role: 'CTO', image: '/images/team2.jpg' },
  { name: 'Michael Brown', role: 'CMO', image: '/images/team3.jpg' },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
        <div className="flex justify-center space-x-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="w-1/3 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
