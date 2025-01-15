import { Prisma, prisma } from '../src/index'
import { randUuid as uuidv4 } from '@ngneat/falso'
import chalk from 'chalk'

const courseIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()]

const courses: Prisma.CourseCreateInput[] = [
  {
    id: courseIds[0],
    title: 'Bachelor of Elementary Education'
  },
  {
    id: courseIds[1],
    title: 'Bachelor of Science in Food Technology'
  },
  {
    id: courseIds[2],
    title: 'Bachelor of Science in Criminology'
  },
  {
    id: courseIds[3],
    title: 'Bachelor of Science in Fisheries'
  },
  {
    id: courseIds[4],
    title: 'Bachelor of Science in Computer Science'
  }
]

const seminars: Prisma.TrainingSeminarCreateInput[] = [
  {
    title: 'Literacy',
    description: 'Enhancing reading, writing, and comprehension skills.',
    course: {
      connect: { id: courseIds[0] }
    },
    questions: {
      create: [
        {
          text: 'Ano ang pinakamalawak na kahulugan ng literacy?',
          options: {
            create: [
              { label: 'Kakayahang magsulat lamang', isCorrect: false },
              {
                label: 'Kakayahang magbasa, magsulat, at makaunawa',
                isCorrect: true
              },
              { label: 'Kakayahang magturo', isCorrect: false },
              { label: 'Kakayahang makinig', isCorrect: false }
            ]
          }
        },
        {
          text: 'Ano ang pangunahing benepisyo ng pagkakaroon ng mataas na literacy rate?',
          options: {
            create: [
              { label: 'Mas maraming panahon sa paglalaro', isCorrect: false },
              {
                label: 'Mas malaking kita sa trabaho',
                isCorrect: false
              },
              {
                label: 'Mas malawak na oportunidad sa edukasyon at trabaho',
                isCorrect: true
              },
              {
                label: 'Mas maraming oras sa pakikipagkaibigan',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Paano naiimpluwensyahan ng edukasyon ang pag-unlad ng isang komunidad?',
          options: {
            create: [
              { label: 'Nagiging mas aktibo sa sports', isCorrect: false },
              {
                label: 'Nagkakaroon ng mas mataas na antas ng kabuhayan',
                isCorrect: true
              },
              {
                label: 'Nagiging mas matulungin sa komunidad',
                isCorrect: false
              },
              {
                label: 'Nagiging masaya ang lahat',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Ano ang pangunahing layunin ng "reading comprehension"?',
          options: {
            create: [
              { label: 'Pagbilang ng mga letra', isCorrect: false },
              {
                label:
                  ' Pag-unawa sa mga ideya at impormasyon mula sa binabasa',
                isCorrect: true
              },
              {
                label: 'Pagsulat ng mga tula',
                isCorrect: false
              },
              {
                label: 'NPagbabasa ng mga numero',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Ano ang epekto ng maagang pagtuturo ng literacy sa mga bata?',
          options: {
            create: [
              { label: 'Nagiging tamad sila', isCorrect: false },
              {
                label: ' Nagiging mas aktibo sila sa pakikipaglaro',
                isCorrect: false
              },
              {
                label:
                  'Nagiging handa sila para sa mas mataas na antas ng edukasyon',
                isCorrect: true
              },
              {
                label: 'Nagiging makulit sa klase',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Alin ang mahalagang kasanayan sa pagsulat ng mga salita?',
          options: {
            create: [
              { label: 'Pagbilang', isCorrect: false },
              {
                label: 'Pag-unawa sa baybay',
                isCorrect: true
              },
              {
                label: 'Pagbigkas ng mga titik',
                isCorrect: false
              },
              {
                label: 'Pag-awit',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Bakit mahalaga ang "functional literacy"?',
          options: {
            create: [
              { label: 'Para makapagbasa lamang', isCorrect: false },
              {
                label: 'Para matutunan ang mga kasanayan sa araw-araw na buhay',
                isCorrect: true
              },
              {
                label: 'Para matutunan ang mga kasanayan sa sports',
                isCorrect: false
              },
              {
                label: 'Para matutunan ang pagguhit',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Anong epekto ang maaaring idulot ng kawalan ng literacy?',
          options: {
            create: [
              { label: 'Hirap sa paghahanap ng trabaho', isCorrect: true },
              {
                label: 'Mas maraming kaibigan',
                isCorrect: false
              },
              {
                label: 'Mas mataas na antas ng kasiyahan',
                isCorrect: false
              },
              {
                label: 'Mas maraming libreng oras',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Paano nakatutulong ang pagbabasa sa mga bata?',
          options: {
            create: [
              {
                label:
                  'Nakatutulong ito sa kanilang imahinasyon at kritikal na pag-iisip',
                isCorrect: true
              },
              {
                label: 'Pinipigilan nito ang paglalaro',
                isCorrect: false
              },
              {
                label: 'Ginagawa silang mas masaya',
                isCorrect: false
              },
              {
                label: 'Nagtuturo ito ng pakikipagkaibigan',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Alin sa mga sumusunod ang maaaring maging sanhi ng mababang literacy rate?',
          options: {
            create: [
              {
                label:
                  'Kawalan ng sapat na mga aklat at materyales sa pagbabasa',
                isCorrect: true
              },
              {
                label: 'Maraming gamit sa paaralan',
                isCorrect: false
              },
              {
                label: 'Sobrang paggamit ng teknolohiya',
                isCorrect: false
              },
              {
                label: 'Sobrang oras sa paglalaro',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Ano ang isa sa mga pinakamahusay na paraan upang mapahusay ang kakayahang magbasa ng mga mag-aaral?',
          options: {
            create: [
              { label: 'Pagbabasa araw-araw', isCorrect: true },
              {
                label: 'Pagtutok sa mga gadgets',
                isCorrect: false
              },
              {
                label: 'Paglalaro ng video games',
                isCorrect: false
              },
              {
                label: 'Panonood ng telebisyon',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Paano mapapabuti ng mga magulang ang literacy ng kanilang anak?',
          options: {
            create: [
              { label: 'Pagbabasa ng mga kwento sa kanila', isCorrect: true },
              {
                label: 'Pabayaan silang mag-aral ng mag-isa',
                isCorrect: false
              },
              {
                label: 'Hayaang maglaro buong araw',
                isCorrect: false
              },
              {
                label: 'Palaging naglalakbay',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Alin sa mga sumusunod ang pangunahing layunin ng literacy sa edukasyon?',
          options: {
            create: [
              { label: 'Upang makipaglaro sa mga kaklase', isCorrect: false },
              {
                label: 'Upang makapag-aral ng mas mataas na konsepto',
                isCorrect: true
              },
              {
                label: 'Upang mag-enjoy sa paaralan',
                isCorrect: false
              },
              {
                label: 'Upang matutong sumayaw',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'Paano nakakatulong ang mga teknolohiya sa pagtaas ng literacy rate?',
          options: {
            create: [
              {
                label: 'Paggamit ng mga educational apps at online tools',
                isCorrect: true
              },
              {
                label: 'Panonood ng mga pelikula',
                isCorrect: false
              },
              {
                label: 'Pakikipag-chat sa mga kaibigan',
                isCorrect: false
              },
              {
                label: 'Paglalaro ng mga games online',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: ' Ano ang isang epektibong paraan upang mapaunlad ang literacy sa isang komunidad?',
          options: {
            create: [
              {
                label: 'Pagbibigay ng mga libro at access sa mga library',
                isCorrect: true
              },
              {
                label: 'Pagtigil ng mga klase',
                isCorrect: false
              },
              {
                label: 'Pagbabasa ng mga kwento kasama ang magulang',
                isCorrect: false
              },
              {
                label: 'Pagpupunta sa mga mall',
                isCorrect: false
              }
            ]
          }
        }
      ]
    }
  },
  {
    title: 'Bakes and Pastries',
    description: 'Techniques in baking breads, cakes, and pastries.',
    course: {
      connect: { id: courseIds[1] }
    },
    questions: {
      create: [
        {
          text: 'What are the basic ingredients in bread making?',
          options: {
            create: [
              { label: 'Flour, water, yeast, and sugar', isCorrect: false },
              { label: 'Flour, water, yeast, and salt', isCorrect: true },
              { label: 'Flour, butter, yeast, and salt', isCorrect: false },
              { label: 'Flour, eggs, water, and salt', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is gluten, and why is it important in bread making?',
          options: {
            create: [
              {
                label: 'A type of starch that helps bread rise',
                isCorrect: false
              },
              {
                label: 'A sugar that adds sweetness to bread',
                isCorrect: false
              },
              {
                label:
                  'A protein that gives bread its structure and elasticity',
                isCorrect: true
              },
              { label: 'A fat that makes bread soft', isCorrect: false }
            ]
          }
        },
        {
          text: 'What does "proofing" mean in bread making?',
          options: {
            create: [
              {
                label: 'Baking the bread at a low temperature',
                isCorrect: false
              },
              {
                label: 'Letting the dough rest to develop flavor',
                isCorrect: false
              },
              {
                label: 'Allowing the dough to rise before baking',
                isCorrect: true
              },
              { label: 'Mixing the ingredients slowly', isCorrect: false }
            ]
          }
        },
        {
          text: 'What type of yeast is most commonly used in baking?',
          options: {
            create: [
              {
                label: 'Fresh yeast',
                isCorrect: false
              },
              {
                label: 'Wild yeast',
                isCorrect: false
              },
              {
                label: 'Active dry yeast and instant yeast',
                isCorrect: true
              },
              { label: 'Liquid yeast', isCorrect: false }
            ]
          }
        },
        {
          text: 'Why is it important to knead bread dough?',
          options: {
            create: [
              {
                label: 'To make the dough sweeter',
                isCorrect: false
              },
              {
                label: 'To develop the gluten network',
                isCorrect: true
              },
              {
                label: 'To incorporate more air',
                isCorrect: false
              },
              { label: 'To mix the ingredients evenly', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the purpose of scoring bread before baking?',
          options: {
            create: [
              {
                label: 'To help the bread rise evenly',
                isCorrect: true
              },
              {
                label: 'To make the crust softer',
                isCorrect: false
              },
              {
                label: 'To release steam from inside the dough',
                isCorrect: false
              },
              { label: 'To create a decorative pattern', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the role of sugar in bread making?',
          options: {
            create: [
              {
                label: 'It feeds the yeast and helps with browning',
                isCorrect: true
              },
              {
                label: 'It toughens the dough',
                isCorrect: false
              },
              {
                label: 'It slows down the fermentation process',
                isCorrect: false
              },
              { label: 'It creates air bubbles in the dough', isCorrect: false }
            ]
          }
        },
        {
          text: 'How does steam affect bread baking?',
          options: {
            create: [
              {
                label: 'It makes the bread dense',
                isCorrect: false
              },
              {
                label: 'It helps create a crispy crust',
                isCorrect: true
              },
              {
                label: 'It cools the bread quickly',
                isCorrect: false
              },
              { label: 'It makes the bread chewy', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the creaming method in pastry making?',
          options: {
            create: [
              {
                label:
                  'Mixing sugar and butter together until light and fluffy',
                isCorrect: true
              },
              {
                label: 'Folding flour into wet ingredients',
                isCorrect: false
              },
              {
                label: 'Beating eggs until stiff peaks form',
                isCorrect: false
              },
              { label: 'Mixing all ingredients at once', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is blind baking?',
          options: {
            create: [
              {
                label: 'Baking a pastry without filling',
                isCorrect: true
              },
              {
                label: 'Baking bread without yeast',
                isCorrect: false
              },
              {
                label: 'Baking with the oven door closed',
                isCorrect: false
              },
              { label: 'Baking dough covered with foil', isCorrect: false }
            ]
          }
        },
        {
          text: 'What type of flour is typically used for bread making?',
          options: {
            create: [
              {
                label: 'Cake flour',
                isCorrect: false
              },
              {
                label: 'Bread flour',
                isCorrect: true
              },
              {
                label: ' All-purpose flour',
                isCorrect: false
              },
              { label: 'Self-rising flour', isCorrect: false }
            ]
          }
        },
        {
          text: 'Which fat is commonly used in puff pastry?',
          options: {
            create: [
              {
                label: 'Butter',
                isCorrect: true
              },
              {
                label: 'Lard',
                isCorrect: false
              },
              {
                label: 'Shortening',
                isCorrect: false
              },
              { label: 'Olive oil', isCorrect: false }
            ]
          }
        },
        {
          text: 'Why is cold butter used in making pastry dough?',
          options: {
            create: [
              {
                label: "It improves the dough's elasticity",
                isCorrect: false
              },
              {
                label: 'It helps the dough rise',
                isCorrect: false
              },
              {
                label: 'It creates layers in the dough',
                isCorrect: true
              },
              { label: 'It makes the dough softer', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is lamination in pastry?',
          options: {
            create: [
              {
                label: 'Rolling out dough very thin',
                isCorrect: false
              },
              {
                label: 'Folding butter into dough multiple times',
                isCorrect: true
              },
              {
                label: 'Kneading dough until elastic',
                isCorrect: false
              },
              { label: 'Mixing ingredients until smooth', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the difference between a sponge cake and a pound cake?',
          options: {
            create: [
              {
                label: 'Sponge cake uses more eggs and less fat',
                isCorrect: true
              },
              {
                label: 'Pound cake uses yeast as a leavening agent',
                isCorrect: false
              },
              {
                label: 'Sponge cake is denser than pound cake',
                isCorrect: false
              },
              {
                label: 'Pound cake uses more water than sponge cake',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'What is a common leavening agent in pastries like puff pastry?',
          options: {
            create: [
              {
                label: ' Yeast',
                isCorrect: false
              },
              {
                label: 'Baking soda',
                isCorrect: false
              },
              {
                label: 'Steam',
                isCorrect: true
              },
              { label: 'Eggs', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the role of eggs in pastry making?',
          options: {
            create: [
              {
                label: 'To thicken the dough',
                isCorrect: false
              },
              {
                label: 'To act as a leavening agent',
                isCorrect: false
              },
              {
                label: 'To add moisture and richness',
                isCorrect: true
              },
              { label: 'To make the dough rise quickly', isCorrect: false }
            ]
          }
        },
        {
          text: 'What temperature is ideal for baking most breads?',
          options: {
            create: [
              {
                label: '200°F',
                isCorrect: false
              },
              {
                label: '350°F',
                isCorrect: false
              },
              {
                label: '450°F',
                isCorrect: true
              },
              { label: '500°F', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the French term for a bread starter?',
          options: {
            create: [
              {
                label: 'Biga',
                isCorrect: false
              },
              {
                label: 'Levain',
                isCorrect: true
              },
              {
                label: 'Poolish',
                isCorrect: false
              },
              { label: 'Autolyse', isCorrect: false }
            ]
          }
        },
        {
          text: 'Which pastry is known for its flaky texture due to layers of butter and dough?',
          options: {
            create: [
              {
                label: 'Choux pastry',
                isCorrect: false
              },
              {
                label: 'Phyllo pastry',
                isCorrect: false
              },
              {
                label: 'Puff pastry',
                isCorrect: true
              },
              { label: 'Shortcrust pastry', isCorrect: false }
            ]
          }
        }
      ]
    }
  },
  {
    title: 'Fisheries Management',
    description: 'Sustainable practices in managing aquatic resources.',
    course: {
      connect: { id: courseIds[3] }
    },
    questions: {
      create: [
        {
          text: 'Where does red tide occur?',
          options: {
            create: [
              { label: 'In land', isCorrect: false },
              { label: 'In air', isCorrect: false },
              { label: 'In sea', isCorrect: true }
            ]
          }
        },
        {
          text: 'What cause red tide?',
          options: {
            create: [
              { label: 'Bacteria', isCorrect: false },
              { label: 'Algae', isCorrect: true },
              { label: 'Virus', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the other term for red tide?',
          options: {
            create: [
              { label: 'Killer tide', isCorrect: false },
              { label: 'Harmful agal bloom', isCorrect: true },
              { label: 'Strangers tide', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is the scientific equipment used to examine the algae?',
          options: {
            create: [
              { label: 'Microscope', isCorrect: true },
              { label: 'Telescope', isCorrect: false },
              { label: 'Stethoscope', isCorrect: false }
            ]
          }
        },
        {
          text: 'What are the marine species that are filter feeds?',
          options: {
            create: [
              { label: 'Pterodactyl', isCorrect: false },
              { label: 'Janitor Fish', isCorrect: false },
              { label: 'Bivalves', isCorrect: true }
            ]
          }
        },
        {
          text: 'Algae is',
          options: {
            create: [
              { label: 'Bird', isCorrect: false },
              { label: 'Fish', isCorrect: false },
              { label: 'Microorganism', isCorrect: true }
            ]
          }
        },
        {
          text: 'Where does algae mostly grow?',
          options: {
            create: [
              { label: 'In dry places', isCorrect: false },
              { label: 'In wet places', isCorrect: true },
              { label: 'Both', isCorrect: false }
            ]
          }
        },
        {
          text: 'Where does algae find its food?',
          options: {
            create: [
              { label: 'From other algae', isCorrect: false },
              { label: 'It creates its food', isCorrect: true },
              { label: 'From the love of the others', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is a dinoflagellate?',
          options: {
            create: [
              { label: 'An algae', isCorrect: true },
              { label: 'A fish', isCorrect: false },
              { label: 'A dinosaur', isCorrect: false }
            ]
          }
        },
        {
          text: 'What color does algae look?',
          options: {
            create: [
              { label: 'Green', isCorrect: false },
              { label: 'Brown', isCorrect: false },
              { label: 'Both', isCorrect: true }
            ]
          }
        },
        {
          text: 'What is Fisheries',
          options: {
            create: [
              { label: 'Aquaculture', isCorrect: true },
              { label: 'Mariculture', isCorrect: false },
              { label: 'Both', isCorrect: false }
            ]
          }
        },
        {
          text: 'Aquaculture is related to?',
          options: {
            create: [
              { label: 'Farming', isCorrect: false },
              { label: 'Culture', isCorrect: false },
              { label: 'Both', isCorrect: true }
            ]
          }
        },
        {
          text: 'It is related to the activities, processes and steps after harvesting',
          options: {
            create: [
              { label: 'Fisheries post-harvest', isCorrect: true },
              { label: 'Pre-harvest', isCorrect: false },
              { label: 'Farming', isCorrect: false }
            ]
          }
        },
        {
          text: 'What is capture Fisheries?',
          options: {
            create: [
              {
                label:
                  'Harvesting of aquatic resources only in freshwater environment',
                isCorrect: false
              },
              {
                label:
                  'Harvesting of aquatic resources only in both marine and freshwater environment',
                isCorrect: true
              },
              {
                label:
                  'Harvesting of aquatic resources only in marine environment',
                isCorrect: false
              }
            ]
          }
        },
        {
          text: 'The breeding, rearing and harvesting of fish, shellfish, algae and other organisms?',
          options: {
            create: [
              { label: 'Agriculture', isCorrect: false },
              { label: 'Aquaculture', isCorrect: true },
              { label: 'Fish Culture', isCorrect: false }
            ]
          }
        }
      ]
    }
  },
  {
    title: 'Electronic Spreadsheet',
    description:
      'Basic and advanced functions in electronic spreadsheets for data management.',
    course: {
      connect: { id: courseIds[4] }
    },
    questions: {
      create: [
        {
          text: 'The number of rows in a worksheet is',
          options: {
            create: [
              { label: '36500', isCorrect: false },
              { label: '5536', isCorrect: true },
              { label: '256', isCorrect: false }
            ]
          }
        },
        {
          text: 'When a formatted number does not fit within a cell, it displays"',
          options: {
            create: [
              { label: '#####', isCorrect: true },
              { label: '#DIV/0', isCorrect: false },
              { label: '#DIV@', isCorrect: false }
            ]
          }
        },
        {
          text: 'Data can be arranged in ascending or descending order by using___',
          options: {
            create: [
              { label: 'Sort command from Table menu', isCorrect: false },
              { label: 'Sort command from Data menu', isCorrect: true },
              { label: 'Sort command from Tools menu', isCorrect: false }
            ]
          }
        },
        {
          text: 'How many sheets are there in Excel Workbook by default?',
          options: {
            create: [
              { label: '2', isCorrect: false },
              { label: '3', isCorrect: true },
              { label: '4', isCorrect: false }
            ]
          }
        },
        {
          text: 'To move to the previous worksheet press',
          options: {
            create: [
              { label: 'Ctrl+PgUp', isCorrect: true },
              { label: 'Ctrl+PgDn', isCorrect: false },
              { label: 'Shift+Tab', isCorrect: false }
            ]
          }
        },
        {
          text: 'The accounting style shows negative numbers in',
          options: {
            create: [
              { label: 'Bold', isCorrect: false },
              { label: 'Brackets', isCorrect: false },
              { label: 'Paranthesis', isCorrect: true }
            ]
          }
        },
        {
          text: 'The process of identifying specific rows and columns so that so that certain columns and rows are always visible on the screen is called',
          options: {
            create: [
              { label: 'Freezing', isCorrect: true },
              { label: 'Locking', isCorrect: false },
              { label: 'Selecting', isCorrect: false }
            ]
          }
        },
        {
          text: 'When you create two or four separate windows containing part of the spreadsheet that can be viewed, you have created',
          options: {
            create: [
              { label: 'Sections', isCorrect: false },
              { label: 'Panes', isCorrect: true },
              { label: 'Views', isCorrect: false }
            ]
          }
        },
        {
          text: 'Which of the following components displays the contents of the active cell?',
          options: {
            create: [
              { label: 'Name box', isCorrect: false },
              { label: 'Formula bar', isCorrect: true },
              { label: 'Menu bar', isCorrect: false }
            ]
          }
        },
        {
          text: 'A quick way to return to a specific area of a worksheet is to type in the _____',
          options: {
            create: [
              { label: 'Name box', isCorrect: true },
              { label: 'Formula bar', isCorrect: false },
              { label: 'Zoom box', isCorrect: false }
            ]
          }
        },
        {
          text: 'The AutoAdd function adds up numbers in a column or row you specify.',
          options: {
            create: [
              { label: 'True', isCorrect: false },
              { label: 'False', isCorrect: true },
              { label: 'None of the above', isCorrect: false }
            ]
          }
        },
        {
          text: '"AAA" is an example of a ____ in Excel.',
          options: {
            create: [
              { label: 'Cell reference', isCorrect: false },
              { label: 'Column heading', isCorrect: true },
              { label: 'Name box', isCorrect: false }
            ]
          }
        },
        {
          text: '_______ quickly highlight(s) important information in a spreadsheet that match your criteria by applying formatting options, data bars, color scales, or icon sets.',
          options: {
            create: [
              { label: 'Cell references ', isCorrect: false },
              { label: 'Conditional formatting', isCorrect: true },
              { label: 'Excel Tables', isCorrect: false }
            ]
          }
        },
        {
          text: 'The best formula to calculate Profits for January is: ',
          options: {
            create: [
              { label: 'SUM(B2:B3)', isCorrect: false },
              { label: 'B2-B3', isCorrect: true },
              { label: 'B4-(B2+B3)', isCorrect: false }
            ]
          }
        },
        {
          text: 'The best formula to calculate the Average for Profits is:',
          options: {
            create: [
              { label: '(B4+C4+D4)/3', isCorrect: false },
              { label: 'MEAN(B4:E4)', isCorrect: false },
              { label: 'AVERAGE(B4:D4)', isCorrect: true }
            ]
          }
        },
        {
          text: 'As a general rule, Excel will _____-align numbers.',
          options: {
            create: [
              { label: 'Right', isCorrect: true },
              { label: 'Left', isCorrect: false },
              { label: 'Top', isCorrect: false }
            ]
          }
        },
        {
          text: 'When you copy a formula that contains an absolute reference to a new location, the reference ____.',
          options: {
            create: [
              { label: 'Is updated automatically', isCorrect: false },
              { label: 'Does not change', isCorrect: true },
              { label: 'Becomes bold ', isCorrect: false }
            ]
          }
        },
        {
          text: 'Which of the following is a logical function?',
          options: {
            create: [
              { label: 'AVERAGE ', isCorrect: false },
              { label: 'IF', isCorrect: true },
              { label: 'SUMPRODUCT', isCorrect: false }
            ]
          }
        },
        {
          text: ' ____ order arranges content in reverse alphabetical order, from Z to A.',
          options: {
            create: [
              { label: 'Descending', isCorrect: true },
              { label: 'Major', isCorrect: false },
              { label: 'Ascending', isCorrect: false }
            ]
          }
        },
        {
          text: ' ____ are a powerful tool to quickly group, summarize, and rearrange larger datasets.',
          options: {
            create: [
              { label: 'Cell references', isCorrect: false },
              { label: 'Functions', isCorrect: false },
              { label: 'Pivot tables', isCorrect: true }
            ]
          }
        }
      ]
    }
  }
]

const feedbacks: Prisma.FeedbackCategoryCreateInput[] = [
  {
    title: 'The Topic',
    description:
      'Evaluate the relevance, organization, and presentation of the training topic.',
    questions: {
      create: [
        {
          text: 'The topic is relevant to my personal or work needs.',
          type: 'RATING'
        },
        {
          text: 'The delivery of the topic is well-organized and systematic.',
          type: 'RATING'
        },
        {
          text: 'The presentation or demo shown aligns with the training objectives.',
          type: 'RATING'
        },
        {
          text: 'There are opportunities to ask questions for better understanding.',
          type: 'RATING'
        }
      ]
    }
  },
  {
    title: 'The Trainer',
    description:
      'Assess the trainer’s knowledge, delivery, and ability to engage participants.',
    questions: {
      create: [
        {
          text: 'The trainer demonstrates knowledge of the topic.',
          type: 'RATING'
        },
        {
          text: 'The trainer ensures that the information provided is accurate and credible.',
          type: 'RATING'
        },
        {
          text: 'The trainer delivers the topic clearly and understandably.',
          type: 'RATING'
        },
        {
          text: 'The trainer explains well and speaks smoothly.',
          type: 'RATING'
        },
        {
          text: 'The trainer answers questions clearly and makes the answers understandable to the participants.',
          type: 'RATING'
        },
        {
          text: 'The trainer inspires participants to become interested in the topic.',
          type: 'RATING'
        }
      ]
    }
  },
  {
    title: 'The Facilitators',
    description:
      'Evaluate the professionalism, helpfulness, and group management of the facilitators.',
    questions: {
      create: [
        {
          text: 'The facilitators show professionalism in assisting with the training or seminar.',
          type: 'RATING'
        },
        {
          text: 'The facilitators are respectful, patient, and helpful to the participants.',
          type: 'RATING'
        },
        {
          text: 'The facilitators create a conducive and comfortable environment for learning new information.',
          type: 'RATING'
        },
        {
          text: 'The facilitators manage the entire group to ensure a smooth flow of the training.',
          type: 'RATING'
        }
      ]
    }
  },
  {
    title: 'The Accommodation and Food',
    description:
      'Provide feedback on the quality of the food and the comfort of the accommodations.',
    questions: {
      create: [
        {
          text: 'The food provided is of good quality and nutritious.',
          type: 'RATING'
        },
        {
          text: 'The accommodations ensure the comfort of the training participants.',

          type: 'RATING'
        },
        {
          text: 'The training venue is appropriate and comfortable. (There are no distractions for the participants.)',
          type: 'RATING'
        }
      ]
    }
  },
  {
    title: 'General Satisfaction',
    description: 'Rate your overall satisfaction with the training experience.',
    questions: {
      create: [
        { text: 'This training has met my expectations.', type: 'RATING' },
        {
          text: 'This training is one of the best I have attended.',
          type: 'RATING'
        },
        {
          text: 'This training has improved my knowledge, and I will continue applying what I have learned.',
          type: 'RATING'
        }
      ]
    }
  },
  {
    title: 'Feedback',
    description:
      'Share your personal feedback and suggestions for improvement.',
    questions: {
      create: [
        {
          text: 'What part of the training did you like the most?',
          type: 'TEXT'
        },
        {
          text: 'What else would you like us to improve or add to our training?',
          type: 'TEXT'
        }
      ]
    }
  }
]

export const seedRef = async () => {
  await prisma.course.deleteMany()
  for (const course of courses) {
    await prisma.course.create({ data: course })
    console.log(
      chalk.white(`Created course: ${chalk.greenBright(course.title)}`)
    )
  }

  await prisma.trainingSeminar.deleteMany()

  for (const seminar of seminars) {
    await prisma.trainingSeminar.create({ data: seminar })
    console.log(
      chalk.white(`Created seminar: ${chalk.greenBright(seminar.title)}`)
    )
  }

  await prisma.feedbackCategory.deleteMany()

  for (const feedback of feedbacks) {
    await prisma.feedbackCategory.create({ data: feedback })
    console.log(
      chalk.white(
        `Created feedback category: ${chalk.greenBright(feedback.title)}`
      )
    )
  }

  console.log(chalk.bold.yellow('\nDone seeding database\n'))
}

seedRef()
  .catch((e) => {
    console.log(chalk.red('Error seeding database:'))
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
