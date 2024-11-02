import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/app-sidebar'
import { getDictionary } from '@/dictionaries/get-dictionary'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import { LocaleEnum } from '@/types/locales'

interface Props {
  children: React.ReactNode
  params: { lang: LocaleEnum }
}
async function Layout({ children, params }: Props) {
  const dictionary = await getDictionary(params.lang)
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <div className="flex flex-1 flex-col">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Footer dictionary={dictionary} />
      <Header dictionary={dictionary} />
    </>
  )
}

export default Layout
