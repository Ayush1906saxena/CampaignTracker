let express = require('express');
const res = require('express/lib/response');
let app = express();
const port = 5000

// Static Files
app.use(express.static('public'));
// Example for other olders Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))
// app.use('/assets/vendor', express.static(__dirname + 'public/assets/vendor'))

app.use(express.static(__dirname + '/public'))
// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    const students = [
        {
            name: "Geervani",
            rollno: "331001",
            div: "A"
        },
        {
            name: "A N",
            rollno: "151001",
            div: "B"
        },
        {
            name: " C D",
            rollno: "334001",
            div: "A"
        }
    ]
    res.render('home',{students:students});
})

// app.post('/',(req, res)=>{
//     console.log(req.body);
//     res.render('home')

// })

const campaigns = [
    {
        id: 1,
        name: "Campaign NAME",
        projects :[
            "project1","project2"
        ],
        launchDate: "12/04/22",
        numberOfEmployees : "5",
        upcoming: 1,
        success : 1
    },
    {
        id: 2,
        name: "Campaign NAME",
        projects :[
            "project1","project2"
        ],
        launchDate: "12/04/22",
        numberOfEmployees : "5",
        upcoming: 1,
        success : 1
    },
    {
        id: 3,
        name: "Campaign NAME",
        projects :[
            "project1","project2"
        ],
        launchDate: "12/04/22",
        numberOfEmployees : "5",
        upcoming: 1,
        success : 1
    }
]
app.get('/campaign',(req,res)=>{
    res.render('campaign',{campaigns:campaigns});
})

const projects = [
    {
        id: 1,
        projectName: "River Cleaning at <Location>",
        donor: [
            "donor1,donor2"
        ],
        deadline: "15/05/22",
        funds: "134 ",
        timestamp: "6Pm 12/04/22"
    },
    {
        id: 2,
        projectName: "River Cleaning at <Location>",
        donor: [
            "donor1,donor2"
        ],
        deadline: "15/05/22",
        funds: "134 ",
        timestamp: "6Pm 12/04/22"
    },
    {
        id:3,
        projectName: "River Cleaning at <Location>",
        donor: [
            "donor1,donor2"
        ],
        deadline: "15/05/22",
        funds: "134 ",
        timestamp: "6Pm 12/04/22"
    }
]
app.get('/project',(req,res)=>{
    id = req.params.id
    console.log(id);
    res.render('projects',{projects:projects})
})
app.get('/admin',(req,res)=>{
    res.render('admin',{campaigns:campaigns,projects:projects})
})

app.get('/manager',(req,res)=>{
    res.render('manager',{campaigns:campaigns,projects:projects})
})

/************************ manager *************************/
app.get('/manager/',(req,res)=>{
    const milestonesDetails = [
        {
            id: 1,
            name: "Milestone 1",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 2,
            name: "Milestone 2",
            description: "Pellentesque ut neque. Sed a libero. Donec posuere vulputate arcu. Aenean commodo ligula eget dolor. Donec vitae orci sed dolor rutrum auctor.",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 3,
            name: "Milestone 3",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 4,
            name: "Milestone 4",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 5,
            name: "Milestone 5",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        }
    ]
    res.render('manager_index_milestone', {milestonesDetails});
})

app.get('/employee',(req,res)=>{
    const milestonesDetails = [
        {
            id: 1,
            name: "Milestone 1",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 2,
            name: "Milestone 2",
            description: "Pellentesque ut neque. Sed a libero. Donec posuere vulputate arcu. Aenean commodo ligula eget dolor. Donec vitae orci sed dolor rutrum auctor.",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "true",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 3,
            name: "Milestone 3",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "true",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 4,
            name: "Milestone 4",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        },
        {
            id: 5,
            name: "Milestone 5",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "true",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Aarthi"
                },
                {
                    name: "Geervani"
                }
            ]
        }
    ]
    res.render('employeeMilestones', {milestonesDetails});
})


app.get('/manager/project/:id/milestone/create',(req,res)=>{
    res.render('manager_create_milestone', {project_id: req.params.id});
})

app.get('/manager/project/:project_id/milestone/edit/:id',(req,res)=>{
    const milestoneDetails =
        {
            id: 1,
            name: "Milestone 1",
            description: "Some Description here",
            created: "04/06/2022",
            deadline: "31/08/2022",
            completed: "false",
            assigned: [
                {
                    name: "Sakshi"
                },
                {
                    name: "Geervani"
                }
            ]
        }
    res.render('manager_edit_milestone', {project_id: req.params.project_id, milestone: milestoneDetails});
})

app.get('/analytics',(req,res)=>{
    res.render('analytics')
})

app.get('/camp-project/:id',(req,res)=>{
    id = req.params.id
    res.render('projects',{projects:projects})
})

app.get('/fund',(req,res)=>{
    id = req.params.id
    res.render('fund',{projects:projects})
})
const project ={
        id: 1,
        projectName: "River Cleaning at <Location>",
        donor: [
            "donor1,donor2"
        ],
        deadline: "15/05/22",
        funds: "134 ",
        timestamp: "6Pm 12/04/22"
}
app.get('/donor',(req,res)=>{
    res.render('donor',{project:project})
})
app.get('/employee',(req,res)=>{
    res.render('employee',{project:project})
})


app.get('/add',(req,res)=>{
    res.render('addcampaign',{campaigns:campaigns});
})


app.get('/bar',(req,res)=>{
    res.render('login',{campaigns:campaigns});
})
app.listen(port, () => console.info(`App listening on port ${port}`))
// app.listen(5000,()=>{
//     console.log('server running on port 4000')
// })

