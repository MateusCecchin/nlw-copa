import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
              name: "John Doe",
              email: "john.doe@gmail.com",
              avatarUrl: "",

        }
    })
 const pool = await prisma.pool.create({
    data: {
        title: "Example Pool",
        code: 'BOL123',
        ownerId: user.id,
        
        participants: {
            create: {
                userId: user.id
            }
        }
    }
 })   

 await prisma.game.create({
    data: {
        date: "2022-11-24T15:00:00.155Z",
        firstTeamCountryCode: "SRB",
        secondTeamCoutryCode: "BR",
    }
 })
 await prisma.game.create({
    data: {
        date: "2022-11-28T12:00:00.155Z",
        firstTeamCountryCode: "CHE",
        secondTeamCoutryCode: "BR",

        guesses: {
            create: {
                firtsTeamPoints: 2,
                secondTeamPoints: 1,

                Participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }
            }
        }
    }
 })

//  const participant = await prisma.participant.create({
//     data: {
//         poolId: pool.id,
//         userId: user.id
//     }
//  })
}

main()