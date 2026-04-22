import { Item, Root as Radio } from '@radix-ui/react-radio-group'
import { CircleCheck, RotateCcw, Settings } from 'lucide-react'
import type { SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import { IconDir } from '@/assets/custom/icon-dir'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { IconThemeDark } from '@/assets/custom/icon-theme-dark'
import { IconThemeLight } from '@/assets/custom/icon-theme-light'
import { IconThemeSystem } from '@/assets/custom/icon-theme-system'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useDirection } from '@/context/direction-provider'
import { type Collapsible, useLayout } from '@/context/layout-provider'
import { useLocale } from '@/context/locale-provider'
import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'
import { useSidebar } from './ui/sidebar'

type OptionItem = {
  value: string
  label: string
  ariaLabel: string
  previewLabel: string
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
}

function createOption(
  value: string,
  label: string,
  icon: OptionItem['icon'],
  selectLabel: string,
  previewLabel: string
): OptionItem {
  return {
    value,
    label,
    icon,
    ariaLabel: selectLabel,
    previewLabel,
  }
}

export function ConfigDrawer() {
  const { t } = useTranslation()
  const { resetLocale } = useLocale()
  const { setOpen } = useSidebar()
  const { resetDir } = useDirection()
  const { resetTheme } = useTheme()
  const { resetLayout } = useLayout()

  const handleReset = () => {
    setOpen(true)
    void resetLocale()
    resetDir()
    resetTheme()
    resetLayout()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          aria-label={t('config.open')}
          className='rounded-full'
        >
          <Settings aria-hidden='true' />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='pb-0 text-start'>
          <SheetTitle>{t('config.title')}</SheetTitle>
          <SheetDescription>{t('config.description')}</SheetDescription>
        </SheetHeader>
        <div className='space-y-6 overflow-y-auto px-4'>
          <LanguageConfig />
          <ThemeConfig />
          <SidebarConfig />
          <LayoutConfig />
          <DirConfig />
        </div>
        <SheetFooter className='gap-2'>
          <Button
            variant='destructive'
            onClick={handleReset}
            aria-label={t('config.resetAll')}
          >
            {t('config.resetAll')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SectionTitle({
  title,
  showReset = false,
  onReset,
  resetAriaLabel,
  className,
}: {
  title: string
  showReset?: boolean
  onReset?: () => void
  resetAriaLabel?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground',
        className
      )}
    >
      {title}
      {showReset && onReset && (
        <Button
          type='button'
          size='icon'
          variant='secondary'
          className='size-4 rounded-full'
          onClick={onReset}
          aria-label={resetAriaLabel}
        >
          <RotateCcw className='size-3' />
        </Button>
      )}
    </div>
  )
}

function RadioGroupItem({
  item,
  isTheme = false,
}: {
  item: OptionItem
  isTheme?: boolean
}) {
  return (
    <Item
      value={item.value}
      className={cn('group outline-none', 'transition duration-200 ease-in')}
      aria-label={item.ariaLabel}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          'relative rounded-[6px] ring-[1px] ring-border',
          'group-data-[state=checked]:shadow-2xl group-data-[state=checked]:ring-primary',
          'group-focus-visible:ring-2'
        )}
        role='img'
        aria-hidden='false'
        aria-label={item.previewLabel}
      >
        <CircleCheck
          className={cn(
            'size-6 fill-primary stroke-white',
            'group-data-[state=unchecked]:hidden',
            'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
          )}
          aria-hidden='true'
        />
        <item.icon
          className={cn(
            !isTheme &&
              'fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground'
          )}
          aria-hidden='true'
        />
      </div>
      <div
        className='mt-1 text-xs'
        id={`${item.value}-description`}
        aria-live='polite'
      >
        {item.label}
      </div>
    </Item>
  )
}

function LanguageConfig() {
  const { t } = useTranslation()
  const { defaultLocale, locale, locales, setLocale } = useLocale()

  return (
    <div>
      <SectionTitle
        title={t('config.sections.language')}
        showReset={locale !== defaultLocale}
        onReset={() => {
          void setLocale(defaultLocale)
        }}
        resetAriaLabel={t('config.resetLabels.language')}
      />
      <Radio
        value={locale}
        onValueChange={(value) => {
          void setLocale(value as typeof locale)
        }}
        className='grid w-full max-w-md grid-cols-2 gap-4'
        aria-label={t('config.sections.language')}
        aria-describedby='language-description'
      >
        {locales.map((item) => (
          <Item
            key={item}
            value={item}
            className={cn(
              'rounded-lg border border-border px-3 py-3 text-sm font-medium transition-colors outline-none',
              'data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary',
              'focus-visible:ring-2 focus-visible:ring-ring/50'
            )}
            aria-label={t('config.aria.select', { label: item })}
          >
            {item}
          </Item>
        ))}
      </Radio>
      <div id='language-description' className='sr-only'>
        {t('config.descriptions.language')}
      </div>
    </div>
  )
}

function ThemeConfig() {
  const { t } = useTranslation()
  const { defaultTheme, theme, setTheme } = useTheme()

  const options = [
    createOption(
      'system',
      t('config.options.system'),
      IconThemeSystem,
      t('config.aria.select', { label: t('config.options.system') }),
      t('config.aria.preview', { label: t('config.options.system') })
    ),
    createOption(
      'light',
      t('config.options.light'),
      IconThemeLight,
      t('config.aria.select', { label: t('config.options.light') }),
      t('config.aria.preview', { label: t('config.options.light') })
    ),
    createOption(
      'dark',
      t('config.options.dark'),
      IconThemeDark,
      t('config.aria.select', { label: t('config.options.dark') }),
      t('config.aria.preview', { label: t('config.options.dark') })
    ),
  ]

  return (
    <div>
      <SectionTitle
        title={t('config.sections.theme')}
        showReset={theme !== defaultTheme}
        onReset={() => setTheme(defaultTheme)}
        resetAriaLabel={t('config.resetLabels.theme')}
      />
      <Radio
        value={theme}
        onValueChange={setTheme}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label={t('config.sections.theme')}
        aria-describedby='theme-description'
      >
        {options.map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id='theme-description' className='sr-only'>
        {t('config.descriptions.theme')}
      </div>
    </div>
  )
}

function SidebarConfig() {
  const { t } = useTranslation()
  const { defaultVariant, variant, setVariant } = useLayout()

  const options = [
    createOption(
      'inset',
      t('config.options.inset'),
      IconSidebarInset,
      t('config.aria.select', { label: t('config.options.inset') }),
      t('config.aria.preview', { label: t('config.options.inset') })
    ),
    createOption(
      'floating',
      t('config.options.floating'),
      IconSidebarFloating,
      t('config.aria.select', { label: t('config.options.floating') }),
      t('config.aria.preview', { label: t('config.options.floating') })
    ),
    createOption(
      'sidebar',
      t('config.options.sidebar'),
      IconSidebarSidebar,
      t('config.aria.select', { label: t('config.options.sidebar') }),
      t('config.aria.preview', { label: t('config.options.sidebar') })
    ),
  ]

  return (
    <div className='max-md:hidden'>
      <SectionTitle
        title={t('config.sections.sidebar')}
        showReset={defaultVariant !== variant}
        onReset={() => setVariant(defaultVariant)}
        resetAriaLabel={t('config.resetLabels.sidebar')}
      />
      <Radio
        value={variant}
        onValueChange={setVariant}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label={t('config.sections.sidebar')}
        aria-describedby='sidebar-description'
      >
        {options.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='sidebar-description' className='sr-only'>
        {t('config.descriptions.sidebar')}
      </div>
    </div>
  )
}

function LayoutConfig() {
  const { t } = useTranslation()
  const { open, setOpen } = useSidebar()
  const { defaultCollapsible, collapsible, setCollapsible } = useLayout()

  const radioState = open ? 'default' : collapsible
  const options = [
    createOption(
      'default',
      t('config.options.default'),
      IconLayoutDefault,
      t('config.aria.select', { label: t('config.options.default') }),
      t('config.aria.preview', { label: t('config.options.default') })
    ),
    createOption(
      'icon',
      t('config.options.compact'),
      IconLayoutCompact,
      t('config.aria.select', { label: t('config.options.compact') }),
      t('config.aria.preview', { label: t('config.options.compact') })
    ),
    createOption(
      'offcanvas',
      t('config.options.fullLayout'),
      IconLayoutFull,
      t('config.aria.select', { label: t('config.options.fullLayout') }),
      t('config.aria.preview', { label: t('config.options.fullLayout') })
    ),
  ]

  return (
    <div className='max-md:hidden'>
      <SectionTitle
        title={t('config.sections.layout')}
        showReset={radioState !== 'default'}
        onReset={() => {
          setOpen(true)
          setCollapsible(defaultCollapsible)
        }}
        resetAriaLabel={t('config.resetLabels.layout')}
      />
      <Radio
        value={radioState}
        onValueChange={(value) => {
          if (value === 'default') {
            setOpen(true)
            return
          }
          setOpen(false)
          setCollapsible(value as Collapsible)
        }}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label={t('config.sections.layout')}
        aria-describedby='layout-description'
      >
        {options.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='layout-description' className='sr-only'>
        {t('config.descriptions.layout')}
      </div>
    </div>
  )
}

function DirConfig() {
  const { t } = useTranslation()
  const { defaultDir, dir, setDir } = useDirection()

  const options = [
    createOption(
      'ltr',
      t('config.options.ltr'),
      (props) => <IconDir dir='ltr' {...props} />,
      t('config.aria.select', { label: t('config.options.ltr') }),
      t('config.aria.preview', { label: t('config.options.ltr') })
    ),
    createOption(
      'rtl',
      t('config.options.rtl'),
      (props) => <IconDir dir='rtl' {...props} />,
      t('config.aria.select', { label: t('config.options.rtl') }),
      t('config.aria.preview', { label: t('config.options.rtl') })
    ),
  ]

  return (
    <div>
      <SectionTitle
        title={t('config.sections.direction')}
        showReset={defaultDir !== dir}
        onReset={() => setDir(defaultDir)}
        resetAriaLabel={t('config.resetLabels.direction')}
      />
      <Radio
        value={dir}
        onValueChange={setDir}
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label={t('config.sections.direction')}
        aria-describedby='direction-description'
      >
        {options.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='direction-description' className='sr-only'>
        {t('config.descriptions.direction')}
      </div>
    </div>
  )
}
