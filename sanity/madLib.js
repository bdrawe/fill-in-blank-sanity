import { registerQuotaErrorCallback } from "workbox-core";

const madLib = {
    name:'madLib',
    title:'Mad Lib',
    type:'document',
    fields:[
        {
            title:'Title',
            name:'title',
            type:'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name:'slug',
            type:'slug',
            options:{source: 'title'},
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Image',
            name:'image',
            type:'image',
            validation: (Rule) => Rule.required(),
        },
        {
            name:'story',
            type:'array',
            of: [
                {
                    type:'block',
                    of: [
                        //this defines is an inline object that can be embedded with each line of test in the story
                        {
                            title:'Placeholder',
                            name:'placeholder',
                            type:'object',
                            fields: [
                                {
                                    title: 'Type',
                                    description: 'The type of placeholder. E.g Adjective, Noun, Celebrity, Animal',
                                    name: 'type',
                                    type:'string'
                                },
                            ],
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        },
    ],
};

export default madLib;