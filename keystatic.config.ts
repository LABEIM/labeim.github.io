import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'labeim/website-eim',
      }
    : {
        kind: 'local',
      },
  collections: {
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        author: fields.text({ label: 'Author', defaultValue: 'Admin EIM' }),
        news_date: fields.date({ label: 'Date' }),
        image: fields.array(fields.text({ label: 'Image URL' }), {
          label: 'Images',
          itemLabel: props => props.value,
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({ label: 'Category' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Ongoing', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
          ],
          defaultValue: 'upcoming',
        }),
        event_date: fields.date({ label: 'Event Date' }),
        description: fields.document({
          label: 'Description/Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        link: fields.text({ label: 'Link (Optional)' }),
        image: fields.array(fields.text({ label: 'Image URL' }), {
          label: 'Images',
          itemLabel: props => props.value,
        }),
        icon: fields.text({ label: 'FontAwesome Icon class (e.g., fa-building-columns)' }),
        organizer: fields.text({ label: 'Organizer', defaultValue: 'EIM Research Lab' }),
        benefits: fields.array(fields.text({ label: 'Benefit' }), {
          label: 'Benefits',
          itemLabel: props => props.value,
        }),
        requirements: fields.array(fields.text({ label: 'Requirement' }), {
          label: 'Requirements',
          itemLabel: props => props.value,
        }),
        show_register: fields.checkbox({ label: 'Show Register Button', defaultValue: true }),
      },
    }),
  },
  singletons: {
    members: singleton({
      label: 'Members (Structure)',
      path: 'src/data/members',
      format: { data: 'json' },
      schema: {
        list: fields.array(
          fields.object({
            id: fields.number({ label: 'ID (Unique order number)' }),
            name: fields.text({ label: 'Name' }),
            role: fields.text({ label: 'Role' }),
            division: fields.select({
              label: 'Division',
              options: [
                { label: 'Core', value: 'core' },
                { label: 'Research', value: 'research' },
                { label: 'PKU', value: 'pku' },
                { label: 'Competition', value: 'competition' },
                { label: 'Media & PR', value: 'media' },
                { label: 'Community Service', value: 'community' },
              ],
              defaultValue: 'core',
            }),
            image: fields.text({ label: 'Image Path' }),
            scale: fields.text({ label: 'Scale Factor', defaultValue: '2.8' }),
            position: fields.text({ label: 'Image Position', defaultValue: 'center' }),
          }),
          {
            label: 'Lab Members List',
            itemLabel: props => props.fields.name.value || 'Member',
          }
        ),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'src/data/about',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'About Page Title', defaultValue: 'About EIM Research Lab' }),
        description: fields.text({ label: 'Short Hero Description', defaultValue: 'Getting closer to the Enterprise Infrastructure Management research laboratory at Telkom University.' }),
        overviewTitle: fields.text({ label: 'Overview Section Title', defaultValue: 'Enterprise Infrastructure Management Laboratory' }),
        overviewContent1: fields.text({ label: 'Overview Paragraph 1', defaultValue: 'EIM (Enterprise Infrastructure Management) is a research laboratory under the S1 Information Systems Study Program, Enterprise and Industrial System Expertise Group, Faculty of Industrial Engineering, Telkom University.' }),
        overviewContent2: fields.text({ label: 'Overview Paragraph 2', defaultValue: 'We focus on understanding and developing digital infrastructure such as computer networks, operating systems, cloud computing, and cybersecurity. We conduct research, in-depth studies, and large-scale technology training to prepare future digital talents.' }),
        overviewImage: fields.text({ label: 'Overview Image Path', defaultValue: '/image/eim/EIM.avif' }),
        vision: fields.text({ label: 'Vision Statement', defaultValue: 'To establish the Enterprise Infrastructure Management (EIM) Research Laboratory as a hub for optimal assistant potential development, creating a leading, collaborative, and competitive research laboratory capable of producing innovative and professional human resources ready to contribute academically and industrially.' }),
        missions: fields.array(fields.text({ label: 'Mission Point' }), {
          label: 'Missions',
          itemLabel: props => props.value,
        }),
      },
    }),
  },
});
