
import InlineEmpty from "@/components/custom/InlineEmpty"
import useCaseGetter from "../hooks/useCaseGetter"
import InlineLoading from "@/components/custom/InlineLoading"
import ErrorState from "@/components/custom/ErrorState"
import ShowCaseList from "../components/ShowCaseList"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"

export function NavCases() {
  const { cases, isError, isLoading } = useCaseGetter()


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Cases</SidebarGroupLabel>
      <SidebarMenu>
        {
          isLoading
            ? <InlineLoading className="mt-10" title="Fetching your cases" />
            : isError
              ? <ErrorState className="mt-10" title="Failed to fetch cases" />
              : cases?.length > 0
                ? <ShowCaseList cases={cases} />
                : <div className="flex flex-col item-center gap-4">
                  <InlineEmpty title="No cases found..." className="mt-10" />
                </div>
        }
      </SidebarMenu>
    </SidebarGroup>
  )
}
