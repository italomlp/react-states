import { FC, PropsWithChildren, ReactElement } from "react"

import { queryClient } from "@/query"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  RenderOptions,
  RenderResult,
  render,
  renderHook,
} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

type CustomRenderFunction = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => RenderResult

// If the application has providers, you can add them in the wrapper below
const ApplicationProviders: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const customRender: CustomRenderFunction = (ui, options?) =>
  render(ui, { wrapper: ApplicationProviders, ...options })

// Needed to either navigate between routes or render 'react-router-dom' child components such as Link
const renderWithRouter: CustomRenderFunction = (ui, options?) =>
  customRender(ui, { wrapper: BrowserRouter, ...options })

const customRenderHook: typeof renderHook = (fn) =>
  renderHook(fn, { wrapper: ApplicationProviders })

export * from "@testing-library/react"
export {
  customRender as render,
  customRenderHook as renderHook,
  renderWithRouter,
}
