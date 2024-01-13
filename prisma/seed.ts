import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const venueSeedData = [
    {
      title: 'Sample Venue 1',
      address: '123 Main St',
      city: 'City 1',
      province: 'Province 1',
      country: 'Country 1',
      postalCode: '12345',
    },
    {
      title: 'Sample Venue 2',
      address: '456 Oak St',
      city: 'City 2',
      province: 'Province 2',
      country: 'Country 2',
      postalCode: '67890',
    },
  ];
  
  
  // Assuming PrismaClient instance is named `prisma`
  async function seedVenues() {
    for (const venueData of venueSeedData) {
      const venue = await prisma.venue.upsert({
        where: { id: 1 },
        create: venueData,
        update: venueData,
      });
      console.table(venue);
    }
  }

  const eventSeedData = [
    {
      title: 'Sample Event 1',
      description: 'Description for Event 1',
      dressCode: 'Casual',
      startTime: new Date('2023-12-01T18:00:00Z'),
      endTime: new Date('2023-12-01T21:00:00Z'),
      venue: {
        create: {
          title: 'Sample Venue 1',
          address: '123 Main St',
          city: 'City 1',
          province: 'Province 1',
          country: 'Country 1',
          postalCode: '12345',
        },
      },
    },
    {
      title: 'Sample Event 2',
      description: 'Description for Event 2',
      dressCode: 'Formal',
      startTime: new Date('2023-12-05T19:30:00Z'),
      endTime: new Date('2023-12-05T22:30:00Z'),
      venue: {
        create: {
          title: 'Sample Venue 2',
          address: '456 Oak St',
          city: 'City 2',
          province: 'Province 2',
          country: 'Country 2',
          postalCode: '67890',
        },
      },
    },
  ];
  
  // Assuming PrismaClient instance is named `prisma`
  async function seedEvents() {
    for (const eventData of eventSeedData) {
      const event = await prisma.event.upsert({
        where: { id: 1 },
        create: eventData,
        update: eventData,
      });
      console.table(event);
    }
  }
  
  
  async function run() {
    //upsert find the row in table try to update if does not exist inserts
    const user = await prisma.user.upsert({
        where: { email: "user@example.com" },
        update: {},
        create: {
            firstName: "Luiz",
            lastName: "Wakano",
            email: "user@example.com",
            uid: "asakjk24j2kj2k4"
        },
    });
    
    console.log({ user });
    seedVenues();
    seedEvents();
}


run()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });