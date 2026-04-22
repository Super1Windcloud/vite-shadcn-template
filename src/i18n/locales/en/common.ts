export const enCommon = {
  app: {
    name: 'Vite Shadcn Template',
  },
  config: {
    open: 'Open preference settings',
    title: 'Preference Settings',
    description: 'Adjust language, appearance, and layout preferences.',
    resetAll: 'Reset all settings to default values',
    sections: {
      language: 'Language',
      theme: 'Theme',
      sidebar: 'Sidebar',
      layout: 'Layout',
      direction: 'Direction',
    },
    resetLabels: {
      language: 'Reset language preference to default',
      theme: 'Reset theme preference to default',
      sidebar: 'Reset sidebar style to default',
      layout: 'Reset layout options to default',
      direction: 'Reset text direction to default',
    },
    descriptions: {
      language: 'Choose the application display language',
      theme: 'Choose between system preference, light mode, or dark mode',
      sidebar: 'Choose between inset, floating, or standard sidebar layout',
      layout:
        'Choose between default expanded, compact icon-only, or full layout mode',
      direction: 'Choose between left-to-right or right-to-left site direction',
    },
    options: {
      system: 'System',
      light: 'Light',
      dark: 'Dark',
      inset: 'Inset',
      floating: 'Floating',
      sidebar: 'Sidebar',
      default: 'Default',
      compact: 'Compact',
      fullLayout: 'Full layout',
      ltr: 'Left to Right',
      rtl: 'Right to Left',
    },
    aria: {
      select: 'Select {{label}}',
      preview: '{{label}} option preview',
    },
  },
  dashboard: {
    title: 'Dashboard',
    download: 'Download',
    tabs: {
      overview: 'Overview',
      analytics: 'Analytics',
      reports: 'Reports',
      notifications: 'Notifications',
    },
    cards: {
      revenue: 'Total Revenue',
      subscriptions: 'Subscriptions',
      sales: 'Sales',
      active: 'Active Now',
      revenueDelta: '+20.1% from last month',
      subscriptionsDelta: '+180.1% from last month',
      salesDelta: '+19% from last month',
      activeDelta: '+201 since last hour',
    },
    recentSales: {
      title: 'Recent Sales',
      description: 'You made 265 sales this month.',
    },
  },
} as const
