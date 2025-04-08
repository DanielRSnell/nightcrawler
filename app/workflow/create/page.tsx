'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BasicDetailsStep } from '@/components/workflow/create/basic-details-step';
import { EnvironmentStep } from '@/components/workflow/create/environment-step';
import { OptionsStep } from '@/components/workflow/create/options-step';
import { ReviewStep } from '@/components/workflow/create/review-step';
import { SuccessScreen } from '@/components/workflow/create/success-screen';
import { WorkflowFormValues } from '@/components/workflow/create/types';

const formSchema = z.object({
  // Step 1: Basic Details
  name: z.string().min(2, {
    message: 'Workflow name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  priority: z.string({
    required_error: 'Please select a priority level.',
  }),
  
  // Step 2: Environment Configuration
  environmentStrategy: z.string({
    required_error: 'Please select an environment selection strategy.',
  }),
  traceLevel: z.string({
    required_error: 'Please select a trace level.',
  }),
  environments: z.object({
    awsVirginia: z.boolean().default(true),
    dgxCloudCalifornia: z.boolean().default(false),
  }),
  
  // Step 3: Options
  options: z.object({
    enableNotifications: z.boolean().default(false),
    enableLogging: z.boolean().default(true),
    enableRetry: z.boolean().default(false),
  }),
});

export default function CreateWorkflowPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdWorkflow, setCreatedWorkflow] = useState<WorkflowFormValues | null>(null);
  
  const steps = [
    { id: 'details', title: 'Workflow Details', description: 'Define basic workflow properties' },
    { id: 'environment', title: 'Environment Config', description: 'Configure execution environment' },
    { id: 'options', title: 'Advanced Options', description: 'Set additional workflow options' }
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Step 1
      name: 'New ML Training Pipeline',
      description: 'Handles distributed training across multiple GPU nodes',
      priority: 'medium',
      
      // Step 2
      environmentStrategy: 'time',
      traceLevel: 'med',
      environments: {
        awsVirginia: true,
        dgxCloudCalifornia: false,
      },
      
      // Step 3
      options: {
        enableNotifications: false,
        enableLogging: true,
        enableRetry: false,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setCreatedWorkflow(values);
      setShowSuccess(true);
    }, 1500);
  }

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showSuccess && createdWorkflow) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessScreen workflow={createdWorkflow} />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8 px-4 h-full w-full bg-black"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between relative pb-6">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-700">
                <motion.div 
                  className="h-full bg-green-500"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep === 0 
                      ? '0%' 
                      : currentStep === 1 
                        ? '50%' 
                        : '100%'
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                  className="flex flex-col items-center relative z-10"
                >
                  <div 
                    className={cn(
                      "w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-200 cursor-pointer",
                      completedSteps.includes(index)
                        ? "bg-green-500 border-green-500 text-white"
                        : index === currentStep
                          ? "bg-gray-800/50 border-gray-600 text-white"
                          : "bg-gray-900/30 border-gray-700 text-gray-400"
                    )}
                    onClick={() => {
                      // Allow clicking on completed steps or the next available step
                      if (completedSteps.includes(index) || index === currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  >
                    {completedSteps.includes(index) ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index < 9 ? `0${index + 1}` : index + 1}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <p className={cn(
                      "font-medium",
                      index === currentStep 
                        ? "text-white" 
                        : completedSteps.includes(index)
                          ? "text-green-500"
                          : "text-gray-500"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">{steps[currentStep]?.title}</CardTitle>
                <CardDescription>{steps[currentStep]?.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                {currentStep === 0 && <BasicDetailsStep form={form} />}
                {currentStep === 1 && <EnvironmentStep form={form} />}
                {currentStep === 2 && <OptionsStep form={form} />}
                {currentStep === 3 && <ReviewStep form={form} />}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {currentStep > 0 && (
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={goToPrevStep}
                    className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button 
                    type="button" 
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                    onClick={goToNextStep}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Workflow'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
} 