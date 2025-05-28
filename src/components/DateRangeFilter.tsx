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
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Período</h3>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Data Inicial</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-auto justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Data Final</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-auto justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Ações</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={onClearFilter}
              className="text-gray-600"
            >
              Limpar Filtro
            </Button>
            <Button 
              onClick={() => setLastDays(7)}
              className="bg-green-600 hover:bg-green-700"
            >
              Últimos 7 dias
            </Button>
            <Button 
              onClick={() => setLastDays(15)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Últimos 15 dias
            </Button>
            <Button 
              onClick={() => setLastDays(30)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Últimos 30 dias
            </Button>
            <Button 
              onClick={() => setLastDays(90)}
              style={{ backgroundColor: 'rgb(245, 158, 11)', color: 'white' }}
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
