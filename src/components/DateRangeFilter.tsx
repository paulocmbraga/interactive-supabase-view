import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onClearFilter: () => void;
}

const DateRangeFilter = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onClearFilter 
}: DateRangeFilterProps) => {
  const setLastDays = (days: number) => {
    const hoje = new Date();
    const diasAtras = new Date();
    diasAtras.setDate(hoje.getDate() - days);
    onStartDateChange(diasAtras);
    onEndDateChange(hoje);
  };

  return (
    <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Filtrar por Período</h3>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Data Inicial</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-auto justify-start text-left font-normal bg-[#1a1a1a] border-[#3d3d3d] text-gray-300 hover:bg-[#3d3d3d]",
                  !startDate && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2d2d2d] border-[#3d3d3d]" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
                className="pointer-events-auto text-gray-300"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Data Final</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-auto justify-start text-left font-normal bg-[#1a1a1a] border-[#3d3d3d] text-gray-300 hover:bg-[#3d3d3d]",
                  !endDate && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2d2d2d] border-[#3d3d3d]" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                className="pointer-events-auto text-gray-300"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Ações</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={onClearFilter}
              className="text-gray-300 border-[#3d3d3d] hover:bg-[#3d3d3d]"
            >
              Limpar Filtro
            </Button>
            <Button 
              onClick={() => setLastDays(7)}
              className="bg-[#00ff88] hover:bg-[#00cc6a] text-black"
            >
              Últimos 7 dias
            </Button>
            <Button 
              onClick={() => setLastDays(15)}
              className="bg-[#ff8800] hover:bg-[#cc6a00] text-black"
            >
              Últimos 15 dias
            </Button>
            <Button 
              onClick={() => setLastDays(30)}
              className="bg-[#00b4ff] hover:bg-[#0099cc] text-black"
            >
              Últimos 30 dias
            </Button>
            <Button 
              onClick={() => setLastDays(90)}
              className="bg-[#ff00ff] hover:bg-[#cc00cc] text-black"
            >
              Últimos 90 dias
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
