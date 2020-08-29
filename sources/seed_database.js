const user=require("./models/user");
const event=require("./models/event");
const accessLevel=require("./models/accessLevel");
const club=require("./models/club");
const venue=require("./models/venue");


// event.collection.drop();
// accessLevel.collection.drop();

const userList=[
    {
        name : "Harish",
        username : "HarishTeens"            
    },
    {
        name : "Roshan",
        username : "Rk shaw"            
    },
    {
        name : "Smarak Das",
        username : "Smarky"            
    },
    {
        name : "CHinmay Kabi",
        username : "chinukabi"            
    },
    {
        name : "Abel Mathew",
        username : "Designer Knight"            
    },
]
const clubList=["DSC","GDG","MCC","RED","BLUE"]
const eventList = ["Hactoberfest","Hackathon","RUNIO","Fest","Enigma"]
const seedData= async ()=>{
    await user.collection.drop();
    await club.collection.drop();
    await event.collection.drop();
    await accessLevel.collection.drop();
    Promise.all(userList.map(async (data,index)=>{
        let createdUser=await  user.create(data);    
        const createdClub=await club.create({
            clubName : clubList[index]
        })
        const accessLevelObj={
            level:"1",
            associatedClub:createdClub,
            associatedUser:createdUser
        }
        const createdAccessLevel= await accessLevel.create(accessLevelObj);
        
        await createdClub.clubMembers.push(createdAccessLevel);
        await createdClub.save();
        await createdUser.clubs.push(createdAccessLevel);
        await createdUser.save();
        const createdEvent = await event.create({
            eventName:eventList[index]
        })
    }))

}
// const seedData= async ()=>{}
//     let createdUser=await user.create(userList[0]);
// }
seedData()
