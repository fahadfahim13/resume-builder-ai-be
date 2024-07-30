export const getPrompt = (userInput: string) => {
  let prompt = `Description: [${userInput}]; 
    Based on Description, give me a detailed JSON structure for a resume. 
      This JSON will later be used to generate a pdf file for a professional resume. 
      If there is any personal information, use those
      in the JSON as well. The JSON should include the following sections:
  
  Introduction:
  header (Your full name i.e. John Doe)
  subHeader (Your professional title i.e. Software Engineer | Programmer | Digital Marketer)
  header3 (Contact Information i.e. john.doe@yourmail.com)
  smallDescription (Email, phone number, LinkedIn, and any other relevant contact information i.e. john.doe@yourmail.com | +132432423)
  descriptionType (Use "paragraph")
  description (A brief professional summary about yourself)
  
  About Me:
  header (Section title: "Professional Summary" or "About Me")
  descriptionType (Use "paragraph")
  description (A detailed summary of your professional background, key skills, and career objectives)
  
  Skills:
  header (Section title: "Technical Skills" or "Skills")
  descriptionType (Use "list")
  description (A list of your key technical skills, programming languages or Marketing platforms, tools, and technologies you are proficient in)
  
  Experiences:
  header (Company name)
  subHeader (Your job title at the company)
  header3 (Duration of employment, e.g., "June 2019 - Present")
  smallDescription (A brief overview of your role and responsibilities)
  descriptionType (Use "paragraph")
  description (Detailed information about the projects you worked on, technologies used, achievements, and any other relevant details)
  
  Education:
  header (University name)
  subHeader (Your degree)
  header3 (Duration of degree, e.g., "June 2019 - Present")
  smallDescription (A brief overview of your learnings)
  descriptionType (Use "paragraph")
  description (Detailed information about your learnings)

  Projects:
  header (Project name)
  subHeader (Brief description or role in the project)
  header3 (Technologies Used)
  smallDescription (Scope and objectives of the project)
  descriptionType (Use "paragraph")
  description (In-depth explanation of the project, your contributions, and the impact of your work)
  Achievements:
  
  header (Title of the achievement or award)
  descriptionType (Use "paragraph")
  description (Details about the achievement, including the context, significance, and any relevant dates)
  
  Must provide 1 or 2 elements in projects, achievements, education, experiences, and skills.
  Example JSON Structure:
  {
    "introduction": {
      "header": "Your Full Name",
      "subHeader": "Your Professional Title",
      "header3": "Contact Information",
      "smallDescription": {
        "email": "youremail@example.com",
        "phone": "+1234567890",
        "linkedin": "https://www.linkedin.com/in/your-linkedin-profile",
        // Add any other relevant contact information here (e.g., website)
      },
      "descriptionType": "paragraph",
      "description": "A brief professional summary about yourself and your career goals."
    },
    "aboutMe": {
      "header": "Professional Summary",
      "descriptionType": "paragraph",
      "description": "A detailed summary of your professional background, key skills, and career objectives."
    },
    "education": [
      {
        "header": "Stanford University",
        "subHeader": "Computer Science & Engineering",
        "header3": "June 2019 - Present (or similar format)",
        "smallDescription": "A brief overview of your learnings.",
        "descriptionType": "paragraph",
        "description": "Detailed information about your projects, technologies used, achievements, etc."
      },
      // Add more experience objects here (same structure)
    ],
    "skills": {
      "header": "Technical Skills",
      "descriptionType": "list",
      "description": [
        "Skill 1",
        "Skill 2",
        "Skill 3",
        // Add other technical skills here
      ]
    },
    "experiences": [
      {
        "header": "Company Name",
        "subHeader": "Job Title",
        "header3": "June 2019 - Present (or similar format)",
        "smallDescription": "A brief overview of your role and responsibilities.",
        "descriptionType": "paragraph",
        "description": "Detailed information about your projects, technologies used, achievements, etc."
      },
      // Add more experience objects here (same structure)
    ],
    "projects": [
      {
        "header": "Project Name",
        "subHeader": "Brief Description or Role",
        "header3": "Technologies Used",
        "smallDescription": "Scope and objectives of the project.",
        "descriptionType": "paragraph",
        "description": "In-depth explanation of the project, your contributions, and the impact of your work."
      },
      // Add more project objects here (same structure)
    ],
    "achievements": [
      {
        "header": "Title of Achievement or Award",
        "descriptionType": "paragraph",
        "description": "Details about the achievement, context, significance, and date (if applicable)."
      },
      // Add more achievement objects here (same structure)
    ]
  } `;

  return prompt;
};

export const getDescriptionPrompt = (input: string) => `Input: [${input}].
Based on input, give me a professional description of my experience with simple details. 
Description should be professional, simple and not more than 300 words.
Give the description in a JSON like below:
{ description: "Some description based on input..." }
`;
